'use client';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useServiceHealth } from '@/hooks/useServiceHealth';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/workouts': 'Workout Tracker',
  '/weight': 'Weight Tracker',
  '/meals': 'Meal Planner',
  '/exercises': 'Exercise Recommendations',
  '/chatbot': 'AI Coach',
  '/profile': 'Profile',
};

function StatusDot({ up, label }: { up: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5" title={`${label}: ${up ? 'online' : 'offline'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${up ? 'bg-green-500' : 'bg-red-400'}`} />
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { nodeUp, mlUp } = useServiceHealth();
  const title = PAGE_TITLES[pathname] || 'CalixAI';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>

      {/* Service health pills */}
      <div className="hidden sm:flex items-center gap-3 border-r border-gray-200 pr-4 mr-1">
        <StatusDot up={nodeUp} label="API" />
        <StatusDot up={mlUp} label="ML" />
      </div>

      <div className="flex items-center gap-3">
        {user?.goal && (
          <span className="hidden sm:inline text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
            {user.goal}
          </span>
        )}
        {user?.fitness_level && (
          <span className="hidden sm:inline text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
            {user.fitness_level}
          </span>
        )}
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=32&background=2563eb&color=fff`}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
