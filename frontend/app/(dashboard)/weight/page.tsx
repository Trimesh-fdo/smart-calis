'use client';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { weightAPI } from '@/services/api';
import { useToast } from '@/components/ui/Toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { WeightLog } from '@/types';
import { format, parseISO } from 'date-fns';
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from 'recharts';

interface WeightForm {
  weight_kg: number;
  note?: string;
}

export default function WeightPage() {
  const { show } = useToast();
  const qc = useQueryClient();

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['weight'],
    queryFn: () => weightAPI.getAll().then((r) => r.data),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<WeightForm>();

  const mutation = useMutation({
    mutationFn: (d: WeightForm) => weightAPI.log({ weight_kg: Number(d.weight_kg), note: d.note }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['weight'] });
      show('Weight logged!', 'success');
      reset();
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      show(msg || 'Failed to log weight', 'error');
    },
  });

  const weightLogs = logs as WeightLog[];

  const chartData = weightLogs.slice(-20).map((w) => ({
    date: format(parseISO(w.date), 'MMM d'),
    weight: w.weight_kg,
  }));

  const latest = weightLogs.at(-1)?.weight_kg;
  const previous = weightLogs.at(-2)?.weight_kg;
  // Fix: numeric comparison, not string comparison
  const change = latest !== undefined && previous !== undefined
    ? parseFloat((latest - previous).toFixed(1))
    : null;

  const avg = weightLogs.length
    ? parseFloat((weightLogs.reduce((s, w) => s + w.weight_kg, 0) / weightLogs.length).toFixed(1))
    : null;
  const min = weightLogs.length ? Math.min(...weightLogs.map((w) => w.weight_kg)) : null;
  const max = weightLogs.length ? Math.max(...weightLogs.map((w) => w.weight_kg)) : null;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Log Form */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Log Weight</h3>
            <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
              <Input
                label="Weight (kg)"
                type="number"
                step="0.1"
                placeholder="e.g. 72.5"
                error={errors.weight_kg?.message}
                {...register('weight_kg', {
                  required: 'Weight is required',
                  min: { value: 30, message: 'Must be at least 30 kg' },
                  max: { value: 300, message: 'Must be under 300 kg' },
                })}
              />
              <Input
                label="Note (optional)"
                placeholder="Morning weigh-in, after workout…"
                {...register('note')}
              />
              <Button type="submit" loading={mutation.isPending} className="w-full">
                Add Entry
              </Button>
            </form>
          </Card>

          {/* Stats */}
          <div className="mt-4 space-y-3">
            <StatCard
              label="Current Weight"
              value={latest !== undefined ? `${latest} kg` : '—'}
              color="text-blue-600"
              trend={
                change !== null
                  ? {
                      // Weight loss (negative change) is "up" (good for Fat Loss users)
                      value: `${change > 0 ? '+' : ''}${change} kg vs prev`,
                      up: change < 0,
                    }
                  : undefined
              }
            />
            <StatCard label="Average" value={avg !== null ? `${avg} kg` : '—'} color="text-gray-900" />
            <StatCard
              label="Range"
              value={min !== null && max !== null ? `${min} – ${max} kg` : '—'}
              color="text-gray-600"
            />
          </div>
        </div>

        {/* Chart + History */}
        <div className="lg:col-span-3 space-y-6">
          {/* Area Chart */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Weight Trend</h3>
              {weightLogs.length > 0 && (
                <span className="text-xs text-gray-400">{weightLogs.length} entries</span>
              )}
            </div>
            {isLoading ? (
              <div className="h-56 bg-gray-100 rounded-lg animate-pulse" />
            ) : chartData.length === 0 ? (
              <div className="h-56 flex items-center justify-center">
                <div className="text-center">
                  <img src="https://api.iconify.design/mdi:scale-bathroom.svg?color=D1D5DB" alt="" className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No weight data yet. Log your first entry.</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ left: -10 }}>
                  <defs>
                    <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} width={40} />
                  <Tooltip
                    contentStyle={{ border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 12 }}
                    formatter={(v) => [`${v} kg`, 'Weight']}
                  />
                  {avg !== null && (
                    <ReferenceLine
                      y={avg}
                      stroke="#9CA3AF"
                      strokeDasharray="4 4"
                      label={{ value: `avg ${avg}`, fill: '#9CA3AF', fontSize: 10, position: 'right' }}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fill="url(#wGrad)"
                    dot={{ r: 3, fill: '#2563EB' }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>

          {/* History Table */}
          <Card padding={false}>
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Entry History</h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto scrollbar-thin">
              {weightLogs.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No entries yet</p>
              ) : (
                [...weightLogs].reverse().map((w) => (
                  <div key={w._id} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{w.weight_kg} kg</p>
                      {w.note && <p className="text-xs text-gray-400 mt-0.5">{w.note}</p>}
                    </div>
                    <span className="text-xs text-gray-400">
                      {format(parseISO(w.date), 'MMM d, yyyy · HH:mm')}
                    </span>
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
