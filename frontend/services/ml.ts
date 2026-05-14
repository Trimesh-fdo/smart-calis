import axios from 'axios';

const ML_URL = 'http://localhost:5001';

export const ml = axios.create({
  baseURL: ML_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Direct ML service calls (used as fallback or for health checks)
export const mlAPI = {
  health: () => ml.get<{ status: string }>('/health'),

  // All fields exactly as the Flask app expects them
  predictCalories: (data: {
    age: number; gender: string; weight_kg: number; height_cm: number;
    fitness_level: string; exercise: string; duration_min: number;
    intensity: string; sets: number; reps: number; heart_rate_avg?: number;
  }) => ml.post<{ calories_burned: number }>('/predict/calories', data),

  predictExercises: (data: {
    age: number; gender: string; weight_kg: number; height_cm: number;
    fitness_level: string; goal: string; intensity: string; heart_rate_avg?: number;
  }) => ml.post<{ suggested_exercises: string[]; confidence_scores: number[] }>('/predict/exercises', data),

  predictMealPlan: (data: {
    goal: string; fitness_level: string;
    age: number; gender: string; weight_kg: number; height_cm: number;
    intensity?: string; calories_burned?: number;
  }) => ml.post('/predict/meal-plan', data),
};
