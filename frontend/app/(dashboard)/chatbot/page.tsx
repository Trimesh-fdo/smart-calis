'use client';
import { useState, useRef, useEffect } from 'react';
import { chatbotAPI } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { ChatMessage } from '@/types';

const SUGGESTED_PROMPTS = [
  'How many calories should I eat to lose fat?',
  'Best workout split for a beginner?',
  'How can I improve my pull-up count?',
  'Build me a 4-week calisthenics plan',
];

export default function ChatbotPage() {
  const { user } = useAuth();
  const { show } = useToast();
  const firstName = user?.name?.split(' ')[0] || 'there';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hi ${firstName}! I'm your CalixAI coach. I know you're a ${user?.fitness_level || 'fitness'} level athlete working toward ${user?.goal || 'your goals'}. Ask me anything about training, nutrition, or recovery!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (msg?: string) => {
    const text = (msg ?? input).trim();
    if (!text || loading) return;
    setInput('');

    // Auto-resize textarea reset
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await chatbotAPI.chat(text);
      // Backend always returns { reply: string }
      const reply = res.data.reply;
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: unknown) {
      const errMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      const isApiKeyError = errMsg?.includes('API key') || errMsg?.includes('OpenAI');
      show(
        isApiKeyError
          ? 'OpenAI API key not configured. Add OPENAI_API_KEY to backend .env'
          : errMsg || 'AI coach is unavailable. Make sure the Node backend is running.',
        'error'
      );
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please make sure the backend server is running and the OpenAI API key is configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-grow textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
        {/* Chat header */}
        <div className="bg-white border border-gray-200 rounded-t-xl px-5 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
            <img src="https://api.iconify.design/mdi:robot-outline.svg?color=white" alt="" className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">CalixAI Coach</p>
            <p className="text-xs text-green-600 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Online · GPT-3.5-turbo · knows your profile
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400">Goal: <span className="text-gray-600 font-medium">{user?.goal || '—'}</span></p>
            <p className="text-xs text-gray-400">Level: <span className="text-gray-600 font-medium">{user?.fitness_level || '—'}</span></p>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 bg-gray-50 border-x border-gray-200 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                {msg.role === 'user' ? (
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&size=28&background=2563eb&color=fff`}
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    <img src="https://api.iconify.design/mdi:robot-outline.svg?color=6B7280" alt="" className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                    : 'bg-white text-gray-700 border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <img src="https://api.iconify.design/mdi:robot-outline.svg?color=6B7280" alt="" className="w-4 h-4" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts — only show on first message */}
        {messages.length <= 1 && (
          <div className="bg-gray-50 border-x border-gray-200 px-5 pb-3 flex-shrink-0">
            <p className="text-xs text-gray-400 mb-2">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  disabled={loading}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-300 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl px-4 py-3 flex gap-3 items-end flex-shrink-0">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKey}
            placeholder="Ask your coach anything… (Enter to send, Shift+Enter for new line)"
            rows={1}
            className="flex-1 resize-none text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent leading-relaxed overflow-hidden"
            style={{ height: 'auto', minHeight: '24px', maxHeight: '128px' }}
            disabled={loading}
          />
          <Button
            onClick={() => send()}
            loading={loading}
            disabled={!input.trim()}
            size="sm"
            className="flex-shrink-0"
          >
            <img src="https://api.iconify.design/mdi:send.svg?color=white" alt="" className="w-4 h-4" />
            Send
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
