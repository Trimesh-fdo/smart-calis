import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('calix_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('calix_token');
      localStorage.removeItem('calix_user');
      document.cookie = 'calix_token=; path=/; max-age=0';
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data: {
    name: string; email: string; password: string;
    age: number; gender: string; height_cm: number; weight_kg: number;
    fitness_level: string; goal: string;
  }) => api.post<{ token: string; user: { id: string; name: string; email: string } }>('/api/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<{ token: string; user: { id: string; name: string; email: string } }>('/api/auth/login', data),
};

// ── User ──────────────────────────────────────────────────────────────────────
export const userAPI = {
  getProfile: () => api.get('/api/user/'),
  updateProfile: (data: Partial<{
    name: string; age: number; gender: string;
    height_cm: number; weight_kg: number; fitness_level: string; goal: string;
  }>) => api.put('/api/user/', data),
};

// ── Workouts ──────────────────────────────────────────────────────────────────
// calories_burned is optional in the schema (default undefined → stored as-is)
export const workoutAPI = {
  log: (data: {
    exercise: string; duration_min: number; sets: number;
    reps: number; intensity: string; calories_burned?: number;
  }) => api.post('/api/workout/', data),
  getAll: () => api.get('/api/workout/'),
};

// ── Weight ────────────────────────────────────────────────────────────────────
export const weightAPI = {
  log: (data: { weight_kg: number; note?: string }) => api.post('/api/weight/', data),
  getAll: () => api.get('/api/weight/'),
};

// ── Meals ─────────────────────────────────────────────────────────────────────
export const mealAPI = {
  generate: (data: { goal: string; calories_target?: number }) =>
    api.post('/api/meal/', data),
  getAll: () => api.get('/api/meal/'),
  // Returns { tdee: number, goal: string }
  getTDEE: () => api.get<{ tdee: number; goal: string }>('/api/meal/tdee'),
};

// ── Predict (via Node backend — includes auth + auto user-profile enrichment) ─
export const predictAPI = {
  // Proxies body directly to ML /predict/calories
  calories: (data: {
    age: number; gender: string; weight_kg: number; height_cm: number;
    fitness_level: string; exercise: string; duration_min: number;
    intensity: string; sets: number; reps: number; heart_rate_avg?: number;
  }) => api.post<{ calories_burned: number }>('/api/predict/calories', data),

  // Proxies body directly to ML /predict/exercises
  exercises: (data: {
    age: number; gender: string; weight_kg: number; height_cm: number;
    fitness_level: string; goal: string; intensity: string;
    heart_rate_avg?: number; top_n?: number;
  }) => api.post<{ suggested_exercises: string[]; confidence_scores: number[]; total_classes?: number }>('/api/predict/exercises', data),

  // Backend enriches with full user profile from DB — only send overrides
  mealPlan: (data: { goal: string; intensity?: string; calories_burned?: number }) =>
    api.post('/api/predict/meal-plan', data),
};

// ── Chatbot ───────────────────────────────────────────────────────────────────
export const chatbotAPI = {
  // Returns { reply: string }
  chat: (message: string) => api.post<{ reply: string }>('/api/chatbot/', { message }),
};
