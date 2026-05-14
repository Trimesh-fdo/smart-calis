'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard-outline' },
  { href: '/workouts', label: 'Workouts', icon: 'mdi:dumbbell' },
  { href: '/weight', label: 'Weight', icon: 'mdi:scale-bathroom' },
  { href: '/meals', label: 'Meal Planner', icon: 'mdi:food-apple-outline' },
  { href: '/exercises', label: 'Exercises', icon: 'mdi:run' },
  { href: '/chatbot', label: 'AI Coach', icon: 'mdi:robot-outline' },
  { href: '/profile', label: 'Profile', icon: 'mdi:account-outline' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-gray-200 flex flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <img src="https://api.iconify.design/mdi:lightning-bolt.svg?color=white" alt="" className="w-4 h-4" />
          </div>
          <span className="font-semibold text-gray-900 text-lg">CalixAI</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <img
                src={`https://api.iconify.design/${item.icon}.svg?color=${active ? '2563eb' : '6B7280'}`}
                alt=""
                className="w-5 h-5 flex-shrink-0"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=32&background=2563eb&color=fff`}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <img src="https://api.iconify.design/mdi:logout.svg?color=6B7280" alt="" className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
