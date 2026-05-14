'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { mealAPI, predictAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import Image from 'next/image';

interface MealForm {
  goal: string;
  intensity: string;
}

// ML returns macros as range strings e.g. "130-150" — parse the midpoint for the macro bar
function parseMacro(val: string | number): number {
  if (typeof val === 'number') return val;
  const parts = String(val).split('-').map(Number);
  if (parts.length === 2) return Math.round((parts[0] + parts[1]) / 2);
  return Number(parts[0]) || 0;
}

interface MLPlan {
  plan_key: string;
  confidence: number;
  label: string;
  description: string;
  calories_range: string;
  protein_g: string | number;
  carbs_g: string | number;
  fat_g: string | number;
  key_focus: string;
  water_l: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export default function MealsPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [plan, setPlan] = useState<MLPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: tdee } = useQuery({
    queryKey: ['tdee'],
    queryFn: () => mealAPI.getTDEE().then((r) => r.data),
    // Only fetch if user has a complete profile
    enabled: !!(user?.age && user?.weight_kg && user?.height_cm),
  });

  const { register, handleSubmit, watch } = useForm<MealForm>({
    defaultValues: {
      goal: user?.goal || 'Fat Loss',
      intensity: 'Medium',
    },
  });

  const watchedGoal = watch('goal');

  const onSubmit = async (data: MealForm) => {
    if (!user?.age || !user?.weight_kg || !user?.height_cm) {
      show('Complete your profile (age, weight, height, goal, fitness level) first.', 'info');
      return;
    }
    setLoading(true);
    try {
      // Use backend predict endpoint — it auto-reads user profile from DB
      // We only need to send the override fields
      const res = await predictAPI.mealPlan({
        goal: data.goal,
        intensity: data.intensity,
        calories_burned: tdee?.tdee,
      });
      setPlan(res.data as MLPlan);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string; error?: string } } })?.response?.data?.message
        ?? (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      show(msg || 'Meal plan generation failed. Check both servers are running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Parsed macro midpoints for the visual bar
  const protein = plan ? parseMacro(plan.protein_g) : 0;
  const carbs = plan ? parseMacro(plan.carbs_g) : 0;
  const fat = plan ? parseMacro(plan.fat_g) : 0;
  const totalMacros = protein + carbs + fat;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Generate Meal Plan</h3>

            <div className="relative rounded-xl overflow-hidden h-36 mb-4">
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600&auto=format&fit=crop"
                alt="Healthy meal"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-medium">
                AI-powered nutrition plans
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Select label="Goal" options={[
                { value: 'Fat Loss', label: '🔥 Fat Loss' },
                { value: 'Muscle Gain', label: '💪 Muscle Gain' },
                { value: 'Maintenance', label: '⚖️ Maintenance' },
              ]} {...register('goal')} />

              <Select label="Training intensity" options={[
                { value: 'Low', label: 'Low — 1–2x per week' },
                { value: 'Medium', label: 'Medium — 3–4x per week' },
                { value: 'High', label: 'High — 5–6x per week' },
              ]} {...register('intensity')} />

              {/* TDEE info */}
              {tdee?.tdee ? (
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-700 font-medium">Your TDEE</span>
                    <span className="text-xs font-bold text-blue-900">{Math.round(tdee.tdee)} kcal/day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-600">Goal</span>
                    <span className="text-xs text-blue-800">{tdee.goal}</span>
                  </div>
                </div>
              ) : user?.age ? (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-500">TDEE will be calculated from your profile.</p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-xs text-yellow-700 font-medium">Complete your profile first</p>
                  <p className="text-xs text-yellow-600 mt-0.5">Age, weight, height, and fitness level are required.</p>
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full">
                Generate Plan
              </Button>
            </form>
          </Card>
        </div>

        {/* Meal Plan Result */}
        <div className="lg:col-span-2">
          {plan ? (
            <div className="space-y-4">
              {/* Header Card */}
              <Card>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{plan.label}</h2>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{plan.description}</p>
                  </div>
                  <span className="ml-4 flex-shrink-0 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                    {plan.calories_range} kcal
                  </span>
                </div>

                {plan.key_focus && (
                  <p className="text-xs text-gray-500 border-t border-gray-100 pt-3 mt-3">
                    <span className="font-medium text-gray-700">Key focus: </span>{plan.key_focus}
                  </p>
                )}

                {/* Macro bar */}
                <div className="mt-4">
                  <div className="flex gap-0.5 h-2 rounded-full overflow-hidden mb-3">
                    {totalMacros > 0 && (
                      <>
                        <div className="bg-blue-500 rounded-l-full" style={{ width: `${(protein / totalMacros) * 100}%` }} />
                        <div className="bg-green-500" style={{ width: `${(carbs / totalMacros) * 100}%` }} />
                        <div className="bg-orange-400 rounded-r-full" style={{ width: `${(fat / totalMacros) * 100}%` }} />
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { label: 'Protein', value: plan.protein_g, unit: 'g', color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Carbs', value: plan.carbs_g, unit: 'g', color: 'text-green-600', bg: 'bg-green-50' },
                      { label: 'Fat', value: plan.fat_g, unit: 'g', color: 'text-orange-500', bg: 'bg-orange-50' },
                      { label: 'Water', value: plan.water_l, unit: 'L', color: 'text-sky-500', bg: 'bg-sky-50' },
                    ].map((m) => (
                      <div key={m.label} className={`${m.bg} rounded-xl py-2.5 px-1`}>
                        <p className={`text-sm font-bold ${m.color}`}>{m.value}{m.unit}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Meals Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'breakfast' as const, label: 'Breakfast', icon: 'mdi:weather-sunrise', iconColor: 'ca8a04', bg: 'bg-yellow-50' },
                  { key: 'lunch' as const, label: 'Lunch', icon: 'mdi:food-fork-drink', iconColor: '16a34a', bg: 'bg-green-50' },
                  { key: 'dinner' as const, label: 'Dinner', icon: 'mdi:weather-night', iconColor: '2563eb', bg: 'bg-blue-50' },
                  { key: 'snack' as const, label: 'Snack', icon: 'mdi:food-apple-outline', iconColor: 'ea580c', bg: 'bg-orange-50' },
                ].map((meal) => (
                  <Card key={meal.key}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${meal.bg}`}>
                        <img
                          src={`https://api.iconify.design/${meal.icon}.svg?color=${meal.iconColor}`}
                          alt=""
                          className="w-4 h-4"
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{meal.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{plan[meal.key]}</p>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center min-h-80 bg-white rounded-xl border border-gray-200 border-dashed">
              <div className="text-center p-8">
                <img
                  src="https://api.iconify.design/mdi:food-apple-outline.svg?color=D1D5DB"
                  alt=""
                  className="w-16 h-16 mx-auto mb-4"
                />
                <p className="text-gray-600 font-semibold">Your meal plan will appear here</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-xs">
                  Select your goal and intensity, then click Generate Plan. The model uses your full profile to personalise macros.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
