export interface User {
  _id?: string;
  id?: string; // backend auth response returns id, full profile returns _id
  name: string;
  email: string;
  age?: number;
  gender?: 'Male' | 'Female';
  height_cm?: number;
  weight_kg?: number;
  fitness_level?: 'Beginner' | 'Intermediate' | 'Advanced';
  goal?: 'Fat Loss' | 'Muscle Gain' | 'Maintenance';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Workout {
  _id: string;
  exercise: string;
  duration_min: number;
  sets: number;
  reps: number;
  intensity: 'Low' | 'Medium' | 'High';
  calories_burned?: number;
  date: string;
}

export interface WeightLog {
  _id: string;
  weight_kg: number;
  note?: string;
  date: string;
}

export interface MealPlan {
  _id: string;
  goal: string;
  calories_target?: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
  createdAt: string;
}

export interface CaloriePrediction {
  calories_burned: number;
}

export interface ExercisePrediction {
  suggested_exercises: string[];
  confidence_scores: number[];
  total_classes?: number;
}

export interface MealPlanPrediction {
  plan_key: string;
  confidence: number;
  label: string;
  description: string;
  calories_range: string;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  key_focus: string;
  water_l: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TDEE {
  tdee: number;
  bmr: number;
}
