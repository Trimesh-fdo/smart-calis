from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')

def load(name):
    with open(os.path.join(MODELS_DIR, name), 'rb') as f:
        return pickle.load(f)

calorie_model   = load('calorie_model.pkl')
calorie_scaler  = load('calorie_scaler.pkl')
exercise_model  = load('exercise_model.pkl')
exercise_scaler = load('exercise_scaler.pkl')
encoders        = load('encoders.pkl')

# ── Meal plan: direct rule function (no ML model needed) ─────────────────────
MEAL_PLAN_RULES = {
    ('Fat Loss',    'Beginner'):     'fl_beginner',
    ('Fat Loss',    'Intermediate'): 'fl_intermediate',
    ('Fat Loss',    'Advanced'):     'fl_advanced',
    ('Muscle Gain', 'Beginner'):     'mg_beginner',
    ('Muscle Gain', 'Intermediate'): 'mg_intermediate',
    ('Muscle Gain', 'Advanced'):     'mg_advanced',
    ('Maintenance', 'Beginner'):     'mt_standard',
    ('Maintenance', 'Intermediate'): 'mt_standard',
    ('Maintenance', 'Advanced'):     'mt_standard',
}

MEAL_PLAN_MAP = {
    'fl_beginner': {
        'label': 'Fat Loss · Beginner',
        'description': 'Moderate calorie deficit with high protein to preserve muscle.',
        'calories_range': '1500-1800', 'protein_g': '130-150', 'carbs_g': '120-150', 'fat_g': '45-55',
        'key_focus': 'High protein intake, low refined carbs, consistent meal timing.',
        'water_l': 2.5,
        'breakfast': 'Boiled eggs (3) + oats (50g) + green tea',
        'lunch':     'Grilled chicken breast (150g) + brown rice (100g) + salad',
        'dinner':    'Steamed fish (120g) + stir-fried vegetables (200g)',
        'snack':     'Apple + 10 almonds',
    },
    'fl_intermediate': {
        'label': 'Fat Loss · Intermediate',
        'description': 'Strategic carb cycling with strength preservation focus.',
        'calories_range': '1600-1900', 'protein_g': '140-160', 'carbs_g': '130-160', 'fat_g': '50-60',
        'key_focus': 'Carb timing around workouts, lean protein at every meal.',
        'water_l': 2.8,
        'breakfast': 'Egg white omelette (4 eggs) + whole grain toast + black coffee',
        'lunch':     'Turkey breast (160g) + quinoa (80g) + cucumber salad',
        'dinner':    'Baked salmon (140g) + roasted asparagus + lemon',
        'snack':     'Greek yogurt (150g) + blueberries',
    },
    'fl_advanced': {
        'label': 'Fat Loss · Advanced',
        'description': 'Aggressive deficit with micronutrient optimization.',
        'calories_range': '1700-2000', 'protein_g': '155-175', 'carbs_g': '140-170', 'fat_g': '50-65',
        'key_focus': 'Nutrient-dense foods, pre/post-workout nutrition precision.',
        'water_l': 3.0,
        'breakfast': 'Protein smoothie (30g whey) + oats (60g) + banana',
        'lunch':     'Chicken thigh (170g) + sweet potato (150g) + broccoli',
        'dinner':    'Lean beef (130g) + mixed greens + olive oil dressing',
        'snack':     'Cottage cheese (150g) + walnuts (20g)',
    },
    'mg_beginner': {
        'label': 'Muscle Gain · Beginner',
        'description': 'Calorie surplus focused on clean bulking with whole foods.',
        'calories_range': '2400-2800', 'protein_g': '150-170', 'carbs_g': '280-320', 'fat_g': '70-85',
        'key_focus': 'Consistent calorie surplus, protein at every meal, sleep recovery.',
        'water_l': 3.0,
        'breakfast': 'Eggs (4) + banana + whole grain bread (2 slices) + milk (250ml)',
        'lunch':     'White rice (200g) + chicken breast (200g) + lentils (100g)',
        'dinner':    'Pasta (150g) + tuna (120g) + broccoli + olive oil',
        'snack':     'Peanut butter (2 tbsp) + rice cakes + protein shake',
    },
    'mg_intermediate': {
        'label': 'Muscle Gain · Intermediate',
        'description': 'Structured hypertrophy nutrition with optimized macros.',
        'calories_range': '2700-3100', 'protein_g': '165-185', 'carbs_g': '310-360', 'fat_g': '80-95',
        'key_focus': 'Post-workout carb loading, casein protein before bed.',
        'water_l': 3.2,
        'breakfast': 'Overnight oats (80g) + whey protein (30g) + mixed berries + eggs (3)',
        'lunch':     'Rice (220g) + beef (200g) + mixed vegetables + avocado',
        'dinner':    'Chicken (200g) + potato (200g) + spinach + cheese (30g)',
        'snack':     'Milk (300ml) + banana + peanut butter toast',
    },
    'mg_advanced': {
        'label': 'Muscle Gain · Advanced',
        'description': 'High-calorie precision plan for maximum hypertrophy.',
        'calories_range': '3000-3500', 'protein_g': '180-210', 'carbs_g': '360-420', 'fat_g': '90-110',
        'key_focus': 'Nutrient timing, intra-workout nutrition, carb periodization.',
        'water_l': 3.5,
        'breakfast': 'Protein pancakes (3) + eggs (4) + orange juice + oats (100g)',
        'lunch':     'Rice (250g) + salmon (200g) + sweet potato (150g) + broccoli',
        'dinner':    'Chicken (220g) + pasta (170g) + olive oil + mixed vegetables',
        'snack':     'Casein protein shake + mixed nuts (40g) + fruit',
    },
    'mt_standard': {
        'label': 'Maintenance · Balanced',
        'description': 'Balanced macros to maintain current weight and performance.',
        'calories_range': '2000-2400', 'protein_g': '130-150', 'carbs_g': '220-260', 'fat_g': '60-75',
        'key_focus': 'Food variety, micronutrient balance, consistent meal patterns.',
        'water_l': 2.5,
        'breakfast': 'Oats (60g) + mixed fruits + Greek yogurt (150g)',
        'lunch':     'Rice (150g) + mixed vegetables + chicken (150g)',
        'dinner':    'Vegetable soup + whole grain bread (2 slices) + boiled eggs (2)',
        'snack':     'Mixed nuts (30g) + orange',
    },
}


def encode(col, value):
    return int(encoders[col].transform([value])[0])

def bmi(weight_kg, height_cm):
    return round(weight_kg / ((height_cm / 100) ** 2), 2)

def estimate_hr(age, intensity):
    frac = {'High': 0.80, 'Medium': 0.65, 'Low': 0.50}.get(intensity, 0.65)
    rhr  = 65
    return int(rhr + (220 - age - rhr) * frac)


@app.route('/predict/calories', methods=['POST'])
def predict_calories():
    d = request.json
    try:
        age      = d['age']
        weight   = d['weight_kg']
        height   = d['height_cm']
        duration = d['duration_min']
        sets_val = d['sets']
        hr       = d.get('heart_rate_avg') or estimate_hr(age, d['intensity'])
        b        = bmi(weight, height)
        features = np.array([[
            age,
            encode('gender',        d['gender']),
            height, weight, b,
            encode('fitness_level', d['fitness_level']),
            encode('exercise',      d['exercise']),
            duration,
            encode('intensity',     d['intensity']),
            sets_val,
            d['reps'],
            hr,
            sets_val * d['reps'],
            duration  * sets_val,
            round(weight / (age + 1), 3),
            round(hr   / (220 - age), 3),
        ]])
        scaled   = calorie_scaler.transform(features)
        calories = round(float(calorie_model.predict(scaled)[0]), 1)
        return jsonify({'calories_burned': calories})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/predict/exercises', methods=['POST'])
def predict_exercises():
    d = request.json
    try:
        weight = d['weight_kg']
        height = d['height_cm']
        b      = bmi(weight, height)
        hr     = d.get('heart_rate_avg') or estimate_hr(d['age'], d['intensity'])
        fl_e   = encode('fitness_level', d['fitness_level'])
        goal_e = encode('goal',          d['goal'])
        int_e  = encode('intensity',     d['intensity'])
        features = np.array([[
            d['age'],
            encode('gender', d['gender']),
            weight, b,
            fl_e, goal_e, int_e,
            hr,
            fl_e * 10 + goal_e,
            fl_e * 10 + int_e,
        ]])
        scaled    = exercise_scaler.transform(features)
        proba     = exercise_model.predict_proba(scaled)[0]
        top_n     = int(d.get('top_n', 5))          # default 5, caller can override
        top_n     = max(1, min(top_n, len(proba)))   # clamp to valid range
        top_idx   = np.argsort(proba)[::-1][:top_n]
        exercises = encoders['exercise'].inverse_transform(top_idx).tolist()
        scores    = proba[top_idx].tolist()
        return jsonify({
            'suggested_exercises': exercises,
            'confidence_scores': [round(s, 3) for s in scores],
            'total_classes': len(proba),
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/predict/meal-plan', methods=['POST'])
def predict_meal_plan():
    d = request.json
    try:
        goal  = d['goal']
        level = d['fitness_level']
        key   = MEAL_PLAN_RULES.get((goal, level), 'mt_standard')
        plan  = MEAL_PLAN_MAP[key]
        return jsonify({
            'plan_key':    key,
            'confidence':  1.0,
            'alternatives': [{'plan': key, 'confidence': 1.0}],
            **plan,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'CalixAI ML service running'})


if __name__ == '__main__':
    app.run(port=5001, debug=True)
