'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { predictAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select, Input } from '@/components/ui/Input';
import Image from 'next/image';

interface ExerciseForm {
  goal: string;
  fitness_level: string;
  intensity: string;
  heart_rate_avg?: number;
}

interface ExerciseResult {
  suggested_exercises: string[];
  confidence_scores: number[];
  total_classes?: number;
}

const EXERCISE_DESCRIPTIONS: Record<string, string> = {
  'Push-ups': 'Compound upper-body push targeting chest, triceps, and anterior deltoids. Foundation of calisthenics.',
  'Pull-ups': 'Upper-body pull targeting lats, rhomboids, and biceps. Best exercise for back width.',
  'Squats': 'Compound lower-body movement targeting quads, hamstrings, and glutes. King of leg exercises.',
  'Lunges': 'Unilateral leg exercise improving balance, coordination, and single-leg strength.',
  'Burpees': 'High-intensity full-body movement combining squat, push-up, and jump for maximum calorie burn.',
  'Plank': 'Isometric core stability exercise building deep core endurance and spinal alignment.',
  'Dips': 'Upper-body pushing movement primarily targeting triceps and lower chest.',
  'Mountain Climbers': 'Dynamic core and cardio exercise improving agility, endurance, and coordination.',
  'Jumping Jacks': 'Full-body cardio warm-up exercise raising heart rate and improving coordination.',
  'Box Jumps': 'Plyometric power exercise developing explosive leg strength and fast-twitch muscle fibres.',
  'Deadlifts': 'Compound posterior chain exercise targeting hamstrings, glutes, and entire back.',
  'Bench Press': 'Horizontal push exercise targeting pectorals, anterior deltoids, and triceps.',
  'Rows': 'Horizontal pull exercise building upper back thickness and improving posture.',
  'Shoulder Press': 'Overhead push exercise targeting deltoids and triceps for shoulder strength.',
  'Bicep Curls': 'Isolation curl exercise targeting the biceps brachii for arm development.',
  'Tricep Extensions': 'Isolation exercise targeting the long head of the triceps for arm definition.',
};

export default function ExercisesPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<ExerciseForm>({
    defaultValues: {
      goal: user?.goal || 'Fat Loss',
      fitness_level: user?.fitness_level || 'Beginner',
      intensity: 'Medium',
    },
  });

  const onSubmit = async (data: ExerciseForm) => {
    if (!user?.age || !user?.weight_kg || !user?.height_cm || !user?.fitness_level) {
      show('Complete your profile (age, weight, height, fitness level) to get ML recommendations.', 'info');
      return;
    }
    setLoading(true);
    try {
      // Route through backend predict endpoint (auth-protected proxy to ML service)
      const res = await predictAPI.exercises({
        age: user.age,
        gender: user.gender || 'Male',
        weight_kg: user.weight_kg,
        height_cm: user.height_cm,
        fitness_level: data.fitness_level,
        goal: data.goal,
        intensity: data.intensity,
        heart_rate_avg: data.heart_rate_avg ? Number(data.heart_rate_avg) : undefined,
        top_n: 5,
      });
      setResult(res.data);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string; error?: string } } })?.response?.data?.message
        ?? (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      show(msg || 'Exercise prediction failed. Check both servers are running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Get Recommendations</h3>

            <div className="relative rounded-xl overflow-hidden h-36 mb-4">
              <Image
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?w=600&auto=format&fit=crop"
                alt="Exercise"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-medium">
                XGBoost classifier — {'{'}top-3 match{'}'}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Select label="Goal" options={[
                { value: 'Fat Loss', label: 'Fat Loss' },
                { value: 'Muscle Gain', label: 'Muscle Gain' },
                { value: 'Maintenance', label: 'Maintenance' },
              ]} {...register('goal')} />

              <Select label="Fitness level" options={[
                { value: 'Beginner', label: 'Beginner' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
              ]} {...register('fitness_level')} />

              <Select label="Training intensity" options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]} {...register('intensity')} />

              <Input
                label="Heart rate (optional)"
                type="number"
                placeholder="bpm"
                hint="Improves prediction accuracy"
                {...register('heart_rate_avg', { min: 40, max: 220 })}
              />

              {/* Profile summary */}
              {user?.age ? (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 space-y-1.5">
                  <p className="text-xs font-medium text-gray-700">Using your profile</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {[
                      { label: 'Age', val: `${user.age} yrs` },
                      { label: 'Weight', val: `${user.weight_kg} kg` },
                      { label: 'Height', val: `${user.height_cm} cm` },
                      { label: 'Gender', val: user.gender || '—' },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-xs text-gray-400">{s.label}</p>
                        <p className="text-xs font-medium text-gray-700">{s.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-xs text-yellow-700 font-medium">Profile incomplete</p>
                  <p className="text-xs text-yellow-600 mt-0.5">
                    Add age, weight, and height in Profile for ML predictions.
                  </p>
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full">
                Get Recommendations
              </Button>
            </form>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <img src="https://api.iconify.design/mdi:star-circle.svg?color=2563eb" alt="" className="w-5 h-5" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    Top {result.suggested_exercises.length} Exercises for Your Profile
                  </h2>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                  Ranked by model probability · {result.total_classes ?? 16} exercise classes
                </span>
              </div>

              {(() => {
                const topScore  = result.confidence_scores[0] ?? 1;
                const totalClasses = result.total_classes ?? 16;
                // Rank config for up to 5 results
                const RANKS = [
                  { color: 'bg-blue-600',  label: 'Best match',         badge: 'bg-blue-600 text-white' },
                  { color: 'bg-blue-500',  label: 'Strong alternative',  badge: 'bg-blue-50 text-blue-700' },
                  { color: 'bg-blue-400',  label: 'Good option',         badge: 'bg-gray-100 text-gray-600' },
                  { color: 'bg-blue-300',  label: 'Worth trying',        badge: 'bg-gray-100 text-gray-600' },
                  { color: 'bg-blue-200',  label: 'Consider this',       badge: 'bg-gray-100 text-gray-500' },
                ];

                return result.suggested_exercises.map((ex, i) => {
                  const rawPct   = Math.round((result.confidence_scores[i] ?? 0) * 100);
                  // Bar width normalised relative to #1 so it's always visually full
                  const barWidth = Math.round(((result.confidence_scores[i] ?? 0) / topScore) * 100);
                  const rank     = RANKS[i] ?? RANKS[RANKS.length - 1];
                  // How many times stronger than a random guess
                  const vsRandom = ((result.confidence_scores[i] ?? 0) / (1 / totalClasses)).toFixed(1);

                  return (
                    <Card key={ex} padding={false} className="overflow-hidden">
                      <div className="flex">
                        <div className="relative w-32 flex-shrink-0">
                          <Image
                            src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?w=400&auto=format&fit=crop"
                            alt={ex}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center shadow ${rank.color}`}>
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                        </div>

                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{ex}</h3>

                            <div className="text-right flex-shrink-0 min-w-[100px]">
                              <p className="text-xs text-gray-400 mb-1">Model confidence</p>
                              <div className="flex items-center gap-2 justify-end">
                                {/* Normalised bar — #1 always full, rest proportional */}
                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-700 ${rank.color}`}
                                    style={{ width: `${barWidth}%` }}
                                  />
                                </div>
                                <span className={`text-xs font-bold tabular-nums ${i === 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                                  {rawPct}%
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {vsRandom}× vs random
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed">
                            {EXERCISE_DESCRIPTIONS[ex] ?? 'Effective calisthenics exercise matched to your profile.'}
                          </p>

                          <div className="flex gap-1.5 mt-2 flex-wrap">
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium">Bodyweight</span>
                            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${rank.badge}`}>
                              {rank.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                });
              })()}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-80 bg-white rounded-xl border border-gray-200 border-dashed">
              <div className="text-center p-8">
                <img src="https://api.iconify.design/mdi:run.svg?color=D1D5DB" alt="" className="w-16 h-16 mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Personalised exercise recommendations</p>
                <p className="text-gray-400 text-sm mt-2 max-w-xs leading-relaxed">
                  The XGBoost classifier analyses your profile to recommend the 3 best exercises with confidence scores.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
