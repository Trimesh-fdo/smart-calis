'use client';
import { useQuery } from '@tanstack/react-query';
import { workoutAPI, weightAPI, mealAPI } from '@/services/api';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { Workout, WeightLog } from '@/types';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';

function useWorkouts() {
  return useQuery({ queryKey: ['workouts'], queryFn: () => workoutAPI.getAll().then((r) => r.data) });
}
function useWeightLogs() {
  return useQuery({ queryKey: ['weight'], queryFn: () => weightAPI.getAll().then((r) => r.data) });
}
function useTDEE() {
  return useQuery({ queryKey: ['tdee'], queryFn: () => mealAPI.getTDEE().then((r) => r.data) });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: workouts = [], isLoading: wLoading } = useWorkouts();
  const { data: weights = [], isLoading: wtLoading } = useWeightLogs();
  const { data: tdee } = useTDEE();

  // Last 7 days calorie data
  const calorieData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayStr = format(date, 'yyyy-MM-dd');
    const dayWorkouts = (workouts as Workout[]).filter(
      (w) => format(parseISO(w.date), 'yyyy-MM-dd') === dayStr
    );
    const calories = dayWorkouts.reduce((sum, w) => sum + (w.calories_burned || 0), 0);
    return { day: format(date, 'EEE'), calories: Math.round(calories) };
  });

  // Weight chart (last 10 entries)
  const weightData = (weights as WeightLog[])
    .slice(-10)
    .map((w) => ({ date: format(parseISO(w.date), 'MMM d'), weight: w.weight_kg }));

  const totalCalories = (workouts as Workout[]).reduce((s, w) => s + (w.calories_burned || 0), 0);
  const totalWorkouts = (workouts as Workout[]).length;
  const currentWeight = (weights as WeightLog[]).at(-1)?.weight_kg;
  const lastWorkout = (workouts as Workout[])[0];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{greeting()}, {user?.name?.split(' ')[0]} 👋</h2>
        <p className="text-gray-500 mt-1">Here's your fitness overview for today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {wLoading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <StatCard
              label="Total Workouts"
              value={totalWorkouts}
              icon={<img src="https://api.iconify.design/mdi:dumbbell.svg?color=6B7280" className="w-5 h-5" alt="" />}
              color="text-blue-600"
            />
            <StatCard
              label="Total Calories Burned"
              value={`${Math.round(totalCalories).toLocaleString()} kcal`}
              icon={<img src="https://api.iconify.design/mdi:fire.svg?color=6B7280" className="w-5 h-5" alt="" />}
              color="text-orange-600"
            />
            <StatCard
              label="Current Weight"
              value={currentWeight ? `${currentWeight} kg` : '—'}
              icon={<img src="https://api.iconify.design/mdi:scale-bathroom.svg?color=6B7280" className="w-5 h-5" alt="" />}
              color="text-green-600"
            />
            <StatCard
              label="Daily Target (TDEE)"
              value={tdee?.tdee ? `${Math.round(tdee.tdee)} kcal` : '—'}
              icon={<img src="https://api.iconify.design/mdi:lightning-bolt.svg?color=6B7280" className="w-5 h-5" alt="" />}
              color="text-purple-600"
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Calorie Chart */}
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Calories Burned — Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={calorieData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                contentStyle={{ border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [`${v} kcal`, 'Calories']}
              />
              <Bar dataKey="calories" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Weight Chart */}
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Weight Progress</h3>
          {weightData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} width={40} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12 }}
                  formatter={(v) => [`${v} kg`, 'Weight']} />
                <Line type="monotone" dataKey="weight" stroke="#2563EB" strokeWidth={2} dot={{ r: 3, fill: '#2563EB' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-sm text-gray-400">
              No weight logs yet. Start tracking!
            </div>
          )}
        </Card>
      </div>

      {/* Recent Workouts */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Recent Workouts</h3>
          <a href="/workouts" className="text-xs text-blue-600 hover:underline font-medium">View all</a>
        </div>
        {wLoading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
          ))}</div>
        ) : (workouts as Workout[]).length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-400">
            No workouts logged yet. <a href="/workouts" className="text-blue-600 hover:underline">Log your first one →</a>
          </div>
        ) : (
          <div className="space-y-2">
            {(workouts as Workout[]).slice(0, 5).map((w) => (
              <div key={w._id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <img src="https://api.iconify.design/mdi:dumbbell.svg?color=2563eb" alt="" className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{w.exercise}</p>
                    <p className="text-xs text-gray-500">{w.sets}×{w.reps} · {w.duration_min} min · {w.intensity}</p>
                  </div>
                </div>
                <div className="text-right">
                  {w.calories_burned && (
                    <p className="text-sm font-medium text-orange-600">{w.calories_burned} kcal</p>
                  )}
                  <p className="text-xs text-gray-400">{format(parseISO(w.date), 'MMM d')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
