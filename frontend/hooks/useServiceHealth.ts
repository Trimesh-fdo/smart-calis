'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { mlAPI } from '@/services/ml';

export function useServiceHealth() {
  const node = useQuery({
    queryKey: ['health', 'node'],
    queryFn: () => api.get('/api/meal/tdee').then(() => true).catch(() => false),
    staleTime: 30_000,
    retry: false,
    refetchInterval: 60_000,
  });

  const ml = useQuery({
    queryKey: ['health', 'ml'],
    queryFn: () => mlAPI.health().then(() => true).catch(() => false),
    staleTime: 30_000,
    retry: false,
    refetchInterval: 60_000,
  });

  return {
    nodeUp: node.data === true,
    mlUp: ml.data === true,
    checking: node.isLoading || ml.isLoading,
  };
}
