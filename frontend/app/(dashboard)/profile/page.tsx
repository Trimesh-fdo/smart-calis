'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';

interface ProfileForm {
  name: string;
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  fitness_level: string;
  goal: string;
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { show } = useToast();
  const qc = useQueryClient();

  // Fetch fresh profile from DB on every page visit
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userAPI.getProfile().then((r) => r.data),
  });

  const { register, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm<ProfileForm>({
    defaultValues: {
      name: '',
      age: 25,
      gender: 'Male',
      height_cm: 170,
      weight_kg: 70,
      fitness_level: 'Beginner',
      goal: 'Fat Loss',
    },
  });

  // Populate form once profile loads from DB — using reset() so isDirty tracks
  // changes made AFTER the DB data arrived, not against the empty defaults
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        age: profile.age ?? 25,
        gender: profile.gender || 'Male',
        height_cm: profile.height_cm ?? 170,
        weight_kg: profile.weight_kg ?? 70,
        fitness_level: profile.fitness_level || 'Beginner',
        goal: profile.goal || 'Fat Loss',
      });
    }
  }, [profile, reset]);

  const mutation = useMutation({
    mutationFn: (data: ProfileForm) =>
      userAPI.updateProfile({
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
        height_cm: Number(data.height_cm),
        weight_kg: Number(data.weight_kg),
        fitness_level: data.fitness_level,
        goal: data.goal,
      }),
    onSuccess: (res) => {
      const updated = res.data;
      updateUser(updated);
      qc.setQueryData(['profile'], updated);
      // Reset form to the saved values so isDirty becomes false
      reset({
        name: updated.name,
        age: updated.age,
        gender: updated.gender,
        height_cm: updated.height_cm,
        weight_kg: updated.weight_kg,
        fitness_level: updated.fitness_level,
        goal: updated.goal,
      });
      show('Profile saved successfully', 'success');
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      show(msg || 'Failed to save profile', 'error');
    },
  });

  const displayProfile = profile ?? user;

  const bmi =
    displayProfile?.weight_kg && displayProfile?.height_cm
      ? (displayProfile.weight_kg / Math.pow(displayProfile.height_cm / 100, 2)).toFixed(1)
      : null;

  const bmiCategory = (b: number) => {
    if (b < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
    if (b < 25)   return { label: 'Normal', color: 'text-green-600' };
    if (b < 30)   return { label: 'Overweight', color: 'text-yellow-600' };
    return { label: 'Obese', color: 'text-red-600' };
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        {/* Profile header */}
        <Card className="mb-6">
          <div className="flex items-center gap-5">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayProfile?.name || 'User')}&size=80&background=2563eb&color=fff`}
              alt="avatar"
              className="w-20 h-20 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 truncate">{displayProfile?.name || '—'}</h2>
              <p className="text-gray-500 text-sm truncate">{displayProfile?.email || '—'}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {displayProfile?.goal && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {displayProfile.goal}
                  </span>
                )}
                {displayProfile?.fitness_level && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                    {displayProfile.fitness_level}
                  </span>
                )}
              </div>
            </div>
            {bmi && (
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500 mb-0.5">BMI</p>
                <p className={`text-2xl font-bold ${bmiCategory(Number(bmi)).color}`}>{bmi}</p>
                <p className={`text-xs font-medium ${bmiCategory(Number(bmi)).color}`}>
                  {bmiCategory(Number(bmi)).label}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Stats row */}
        {displayProfile && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Age', value: displayProfile.age ? `${displayProfile.age} yrs` : '—' },
              { label: 'Height', value: displayProfile.height_cm ? `${displayProfile.height_cm} cm` : '—' },
              { label: 'Weight', value: displayProfile.weight_kg ? `${displayProfile.weight_kg} kg` : '—' },
            ].map((s) => (
              <Card key={s.label} className="text-center">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className="text-xl font-semibold text-gray-900">{s.value}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Edit form */}
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-5">Edit Profile</h3>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
              {/* Name — explicitly visible and required */}
              <Input
                label="Full name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Age"
                  type="number"
                  error={errors.age?.message}
                  {...register('age', { required: 'Required', min: { value: 13, message: 'Min 13' }, max: { value: 100, message: 'Max 100' } })}
                />
                <Select
                  label="Gender"
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                  ]}
                  {...register('gender')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Height (cm)"
                  type="number"
                  error={errors.height_cm?.message}
                  {...register('height_cm', { required: 'Required', min: { value: 100, message: 'Min 100 cm' } })}
                />
                <Input
                  label="Weight (kg)"
                  type="number"
                  step="0.1"
                  error={errors.weight_kg?.message}
                  {...register('weight_kg', { required: 'Required', min: { value: 30, message: 'Min 30 kg' } })}
                />
              </div>

              <Select
                label="Fitness level"
                options={[
                  { value: 'Beginner', label: 'Beginner' },
                  { value: 'Intermediate', label: 'Intermediate' },
                  { value: 'Advanced', label: 'Advanced' },
                ]}
                {...register('fitness_level')}
              />

              <Select
                label="Goal"
                options={[
                  { value: 'Fat Loss', label: 'Fat Loss' },
                  { value: 'Muscle Gain', label: 'Muscle Gain' },
                  { value: 'Maintenance', label: 'Maintenance' },
                ]}
                {...register('goal')}
              />

              <div className="pt-2 flex items-center gap-3">
                <Button
                  type="submit"
                  loading={mutation.isPending || isSubmitting}
                  disabled={!isDirty}
                  className="flex-1"
                >
                  Save changes
                </Button>
                {!isDirty && !mutation.isPending && (
                  <p className="text-xs text-gray-400">No changes to save</p>
                )}
              </div>

              {mutation.isSuccess && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                  <p className="text-sm text-green-700 font-medium">All changes saved to database</p>
                </div>
              )}
            </form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
