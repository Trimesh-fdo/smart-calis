'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutAPI, predictAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { Workout } from '@/types';
import { format, parseISO } from 'date-fns';

interface WorkoutForm {
  exercise: string;
  duration_min: number;
  sets: number;
  reps: number;
  intensity: string;
  heart_rate_avg?: number;
}

export default function WorkoutsPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const qc = useQueryClient();
  const [prediction, setPrediction] = useState<number | null>(null);
  const [predicting, setPredicting] = useState(false);

  // ── Fetch exercise list from ML model using user profile ──────────────────
  const hasProfile = !!(user?.age && user?.weight_kg && user?.height_cm && user?.fitness_level);

  const { data: mlExercises, isLoading: exercisesLoading } = useQuery({
    queryKey: ['ml-exercises', user?.goal, user?.fitness_level],
    enabled: hasProfile,
    staleTime: 5 * 60_000, // cache for 5 min — profile rarely changes mid-session
    queryFn: async () => {
      const res = await predictAPI.exercises({
        age: user!.age!,
        gender: user!.gender || 'Male',
        weight_kg: user!.weight_kg!,
        height_cm: user!.height_cm!,
        fitness_level: user!.fitness_level!,
        goal: user!.goal || 'Maintenance',
        intensity: 'Medium',
        top_n: 16, // fetch all classes so user can log any exercise
      });
      return res.data.suggested_exercises as string[];
    },
  });

  // Build dropdown options — ranked by model (best match first)
  const exerciseOptions = exercisesLoading
    ? [{ value: '', label: 'Loading exercises from model…' }]
    : !hasProfile
    ? [{ value: '', label: 'Complete your profile to load exercises' }]
    : [
        { value: '', label: 'Select an exercise…' },
        ...(mlExercises ?? []).map((ex, i) => ({
          value: ex,
          label: i === 0 ? `${ex} ⭐ Best match` : ex,
        })),
      ];

  // ── Workout history ───────────────────────────────────────────────────────
  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ['workouts'],
    queryFn: () => workoutAPI.getAll().then((r) => r.data),
  });

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<WorkoutForm>({
    defaultValues: { intensity: 'Medium', sets: 3, reps: 10, duration_min: 30 },
  });

  const formValues = watch();

  // ── ML calorie prediction ─────────────────────────────────────────────────
  const predictCalories = async () => {
    if (!hasProfile) {
      show('Complete your profile (age, weight, height, fitness level) first.', 'info');
      return;
    }
    if (!formValues.exercise) {
      show('Select an exercise first.', 'info');
      return;
    }
    setPredicting(true);
    try {
      const res = await predictAPI.calories({
        age: user!.age!,
        gender: user!.gender || 'Male',
        weight_kg: user!.weight_kg!,
        height_cm: user!.height_cm!,
        fitness_level: user!.fitness_level!,
        exercise: formValues.exercise,
        duration_min: Number(formValues.duration_min) || 30,
        intensity: formValues.intensity || 'Medium',
        sets: Number(formValues.sets) || 3,
        reps: Number(formValues.reps) || 10,
        heart_rate_avg: formValues.heart_rate_avg ? Number(formValues.heart_rate_avg) : undefined,
      });
      setPrediction(Math.round(res.data.calories_burned));
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      show(msg || 'Calorie prediction failed. Check both servers are running.', 'error');
    } finally {
      setPredicting(false);
    }
  };

  // ── Log workout (auto-predicts calories if not already done) ─────────────
  const [logging, setLogging] = useState(false);

  const handleLog = async (data: WorkoutForm) => {
    setLogging(true);
    let calories = prediction;

    // Auto-predict if the user skipped the Predict button
    if (calories === null && hasProfile && data.exercise) {
      try {
        const res = await predictAPI.calories({
          age: user!.age!,
          gender: user!.gender || 'Male',
          weight_kg: user!.weight_kg!,
          height_cm: user!.height_cm!,
          fitness_level: user!.fitness_level!,
          exercise: data.exercise,
          duration_min: Number(data.duration_min),
          intensity: data.intensity,
          sets: Number(data.sets),
          reps: Number(data.reps),
          heart_rate_avg: data.heart_rate_avg ? Number(data.heart_rate_avg) : undefined,
        });
        calories = Math.round(res.data.calories_burned);
        setPrediction(calories);
      } catch {
        // Non-fatal — log without calories if ML is down
      }
    }

    try {
      await workoutAPI.log({
        exercise: data.exercise,
        duration_min: Number(data.duration_min),
        sets: Number(data.sets),
        reps: Number(data.reps),
        intensity: data.intensity,
        ...(calories !== null ? { calories_burned: calories } : {}),
      });
      qc.invalidateQueries({ queryKey: ['workouts'] });
      show(
        calories !== null
          ? `Workout logged! ~${calories} kcal burned`
          : 'Workout logged!',
        'success'
      );
      reset({ intensity: 'Medium', sets: 3, reps: 10, duration_min: 30 });
      setPrediction(null);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      show(msg || 'Failed to log workout', 'error');
    } finally {
      setLogging(false);
    }
  };

  const intensityBadge: Record<string, 'success' | 'warning' | 'danger'> = {
    Low: 'success', Medium: 'warning', High: 'danger',
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Log Form ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-5">Log Workout</h3>

            <form onSubmit={handleSubmit(handleLog)} className="space-y-4">
              {/* Exercise dropdown — populated from ML model */}
              <div>
                <Select
                  label="Exercise"
                  options={exerciseOptions}
                  error={errors.exercise?.message}
                  disabled={exercisesLoading || !hasProfile}
                  {...register('exercise', { required: 'Select an exercise' })}
                />
                {/* Source tag */}
                <p className="text-xs mt-1 flex items-center gap-1">
                  {exercisesLoading ? (
                    <span className="text-gray-400">Fetching from ML model…</span>
                  ) : !hasProfile ? (
                    <span className="text-yellow-600">⚠ Complete your profile to load exercises</span>
                  ) : (
                    <>
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-400">
                        {mlExercises?.length ?? 0} exercises ranked by model · ⭐ = best match for your profile
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input label="Sets" type="number" min={1}
                  error={errors.sets?.message}
                  {...register('sets', { required: true, min: 1 })} />
                <Input label="Reps" type="number" min={1}
                  error={errors.reps?.message}
                  {...register('reps', { required: true, min: 1 })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input label="Duration (min)" type="number" min={1}
                  error={errors.duration_min?.message}
                  {...register('duration_min', { required: true, min: 1 })} />
                <Select label="Intensity" options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' },
                ]} {...register('intensity')} />
              </div>

              <Input
                label="Avg Heart Rate (optional)"
                type="number"
                placeholder="bpm — improves ML accuracy"
                hint="If omitted, the model estimates from your age & intensity"
                {...register('heart_rate_avg', { min: 40, max: 220 })}
              />

              {/* ML Calorie Prediction Panel */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img src="https://api.iconify.design/mdi:fire.svg?color=ea580c" alt="" className="w-4 h-4" />
                    <span className="text-xs font-semibold text-gray-800">ML Calorie Prediction</span>
                  </div>
                  <Button type="button" variant="secondary" size="sm" onClick={predictCalories} loading={predicting}>
                    Predict
                  </Button>
                </div>
                {prediction !== null ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-orange-600">{prediction}</span>
                    <span className="text-sm text-gray-500">kcal estimated</span>
                    <button type="button" onClick={() => setPrediction(null)} className="ml-auto text-xs text-gray-400 hover:text-red-500">
                      Clear
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Calories are predicted automatically on log. Click Predict to preview first.
                  </p>
                )}
              </div>

              {prediction !== null && (
                <p className="text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                  Prediction will be saved with this workout log.
                </p>
              )}

              <Button type="submit" loading={logging} className="w-full">
                {logging ? (prediction === null ? 'Predicting calories…' : 'Saving…') : 'Log Workout'}
              </Button>
            </form>
          </Card>
        </div>

        {/* ── Workout History ────────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <Card padding={false}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Workout History</h3>
                <p className="text-xs text-gray-500 mt-0.5">{(workouts as Workout[]).length} sessions logged</p>
              </div>
              {(workouts as Workout[]).some((w) => w.calories_burned) && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total burned</p>
                  <p className="text-sm font-semibold text-orange-600">
                    {(workouts as Workout[]).reduce((s, w) => s + (w.calories_burned || 0), 0).toLocaleString()} kcal
                  </p>
                </div>
              )}
            </div>

            <div className="divide-y divide-gray-50">
              {isLoading ? (
                <div className="p-6"><TableSkeleton rows={5} /></div>
              ) : (workouts as Workout[]).length === 0 ? (
                <div className="py-16 text-center">
                  <img src="https://api.iconify.design/mdi:dumbbell.svg?color=D1D5DB" alt="" className="w-10 h-10 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">No workouts yet</p>
                  <p className="text-xs text-gray-400 mt-1">Log your first session using the form.</p>
                </div>
              ) : (
                (workouts as Workout[]).map((w) => (
                  <div key={w._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <img src="https://api.iconify.design/mdi:dumbbell.svg?color=2563eb" alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{w.exercise}</p>
                      <p className="text-xs text-gray-500">{w.sets} sets × {w.reps} reps · {w.duration_min} min</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge variant={intensityBadge[w.intensity] ?? 'default'}>{w.intensity}</Badge>
                      {w.calories_burned ? (
                        <span className="text-sm font-semibold text-orange-600 w-20 text-right">
                          {w.calories_burned} kcal
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 w-20 text-right">—</span>
                      )}
                      <span className="text-xs text-gray-400 w-14 text-right">
                        {format(parseISO(w.date), 'MMM d')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
