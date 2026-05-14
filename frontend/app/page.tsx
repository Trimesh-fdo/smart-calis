import Link from 'next/link';
import Image from 'next/image';

const FEATURES = [
  {
    icon: 'mdi:dumbbell',
    title: 'Workout Tracking',
    desc: 'Log every session. Track sets, reps, and duration with ML-powered calorie predictions.',
  },
  {
    icon: 'mdi:food-apple-outline',
    title: 'Smart Meal Planner',
    desc: 'Get personalized meal plans with macros tailored to your goal and fitness level.',
  },
  {
    icon: 'mdi:scale-bathroom',
    title: 'Weight Progress',
    desc: 'Monitor your body composition over time with clean visual charts.',
  },
  {
    icon: 'mdi:robot-outline',
    title: 'AI Fitness Coach',
    desc: 'Chat with an AI coach that knows your profile and gives context-aware advice.',
  },
  {
    icon: 'mdi:run',
    title: 'Exercise Recommendations',
    desc: 'ML-driven exercise suggestions based on your goal, level, and intensity.',
  },
  {
    icon: 'mdi:chart-line',
    title: 'Progress Analytics',
    desc: 'Dashboard with real-time insights on calories, workouts, and trends.',
  },
];

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Workout logging', 'Weight tracking', 'Basic dashboard', '50 AI messages/month'],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    features: ['Everything in Free', 'ML calorie predictions', 'Smart meal planner', 'Unlimited AI coaching', 'Advanced analytics'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per month',
    features: ['Everything in Pro', 'Up to 5 members', 'Team dashboard', 'Priority support', 'Custom branding'],
    cta: 'Contact sales',
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <img src="https://api.iconify.design/mdi:lightning-bolt.svg?color=white" alt="" className="w-4 h-4" />
            </div>
            <span className="font-semibold text-gray-900 text-lg">CalixAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Sign in
            </Link>
            <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Powered by AI & Machine Learning
              </span>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Smart Fitness Tracking<br />
                <span className="text-blue-600">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                CalixAI combines machine learning with intuitive tracking to help you train smarter, eat better, and reach your goals faster.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Start for free
                  <img src="https://api.iconify.design/mdi:arrow-right.svg?color=white" alt="" className="w-4 h-4" />
                </Link>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Sign in →
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-gray-100">
                {[['10K+', 'Active users'], ['2M+', 'Workouts logged'], ['95%', 'Goal success rate']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-gray-900">{num}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop"
                  alt="Fitness tracking"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <img src="https://api.iconify.design/mdi:fire.svg?color=16a34a" alt="" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Calories burned today</p>
                  <p className="text-lg font-bold text-gray-900">847 kcal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to reach your goals</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From AI coaching to precise calorie tracking — CalixAI gives you the tools that elite athletes use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <img src={`https://api.iconify.design/${f.icon}.svg?color=2563eb`} alt="" className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?w=800&auto=format&fit=crop"
                alt="Workout tracking"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ML-powered predictions,<br />not guesswork</h2>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Log your workout', desc: 'Enter exercise, sets, reps, and duration. Our XGBoost model instantly predicts calories burned.' },
                  { step: '02', title: 'Get your meal plan', desc: 'Based on your goal and fitness level, receive a detailed nutrition plan with exact macros.' },
                  { step: '03', title: 'Track your progress', desc: 'Charts and analytics show your weight trend, workout frequency, and calorie expenditure over time.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="text-sm font-bold text-blue-600 w-8 flex-shrink-0 pt-0.5">{item.step}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`rounded-xl border p-6 ${plan.highlight ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white border-gray-200'}`}>
                <p className={`text-sm font-medium mb-4 ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{plan.name}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-blue-50' : 'text-gray-600'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${plan.highlight ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center text-sm font-medium py-2.5 rounded-lg transition-colors ${plan.highlight ? 'bg-white text-blue-600 hover:bg-blue-50' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <img src="https://api.iconify.design/mdi:lightning-bolt.svg?color=white" alt="" className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-gray-900">CalixAI</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 CalixAI. AI-powered fitness coaching.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
