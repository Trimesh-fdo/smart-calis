'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  fitness_level: string;
  goal: string;
}

const STEPS = ['Account', 'Profile', 'Goals'];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');

  const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    defaultValues: { gender: 'Male', fitness_level: 'Beginner', goal: 'Fat Loss' },
  });

  const next = async () => {
    const fields: (keyof RegisterForm)[][] = [
      ['name', 'email', 'password'],
      ['age', 'gender', 'height_cm', 'weight_kg'],
      ['fitness_level', 'goal'],
    ];
    const ok = await trigger(fields[step]);
    if (ok) setStep((s) => s + 1);
  };

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    try {
      const payload = { ...data, age: Number(data.age), height_cm: Number(data.height_cm), weight_kg: Number(data.weight_kg) };
      const res = await authAPI.register(payload);
      // await login so the full profile (name + all fields) is fetched from DB
      // before navigating — prevents dashboard rendering with empty profile data
      await login(res.data.token, res.data.user);
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <img src="https://api.iconify.design/mdi:lightning-bolt.svg?color=white" alt="" className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-900 text-xl">CalixAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Set up your profile to get personalized plans</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium ${i === step ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`w-8 h-px ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Step 0: Account */}
            {step === 0 && (
              <div className="space-y-4">
                <Input label="Full name" placeholder="Alex Johnson" error={errors.name?.message}
                  {...register('name', { required: 'Name is required' })} />
                <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message}
                  {...register('email', { required: 'Email required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
                <Input label="Password" type="password" placeholder="Min 6 characters" error={errors.password?.message}
                  {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 characters' } })} />
              </div>
            )}

            {/* Step 1: Profile */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Age" type="number" placeholder="25" error={errors.age?.message}
                    {...register('age', { required: 'Required', min: { value: 13, message: 'Min 13' }, max: { value: 100, message: 'Max 100' } })} />
                  <Select label="Gender" options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
                    error={errors.gender?.message} {...register('gender', { required: 'Required' })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Height (cm)" type="number" placeholder="175" error={errors.height_cm?.message}
                    {...register('height_cm', { required: 'Required', min: { value: 100, message: 'Min 100cm' } })} />
                  <Input label="Weight (kg)" type="number" placeholder="70" error={errors.weight_kg?.message}
                    {...register('weight_kg', { required: 'Required', min: { value: 30, message: 'Min 30kg' } })} />
                </div>
              </div>
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <div className="space-y-4">
                <Select label="Fitness level" error={errors.fitness_level?.message}
                  options={[
                    { value: 'Beginner', label: 'Beginner' },
                    { value: 'Intermediate', label: 'Intermediate' },
                    { value: 'Advanced', label: 'Advanced' },
                  ]}
                  {...register('fitness_level', { required: 'Required' })} />
                <Select label="Your goal" error={errors.goal?.message}
                  options={[
                    { value: 'Fat Loss', label: 'Fat Loss' },
                    { value: 'Muscle Gain', label: 'Muscle Gain' },
                    { value: 'Maintenance', label: 'Maintenance' },
                  ]}
                  {...register('goal', { required: 'Required' })} />
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <p className="text-xs text-blue-700">Your profile data helps our ML models give you accurate calorie predictions and personalized meal plans.</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">
                  Back
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={next} className="flex-1">
                  Continue
                </Button>
              ) : (
                <Button type="submit" loading={isSubmitting} className="flex-1">
                  Create account
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
