'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import ChatInput from '@/components/ChatInput';
import MessageBubble from '@/components/MessageBubble';
import Sidebar from '@/components/Sidebar';

type ChatItem = {
  id: string;
  title: string;
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [chats] = useState<ChatItem[]>([
    { id: 'demo-1', title: 'Reverse a string in Python' },
    { id: 'demo-2', title: 'Explain React hooks' },
  ]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const { messages, sendMessage, status, error, stop, setMessages } = useChat();
  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
    setInput('');
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveChatId(null);
    setSidebarOpen(false);
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => setActiveChatId(id)}
        onDeleteChat={() => {}}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-slate-800/60 bg-slate-950/60 px-4 py-3 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition-colors md:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">CodePilot</h1>
              <p className="text-[10px] text-slate-500">Gemini 3.8 Flash</p>
            </div>
          </div>

          <div className="ml-auto hidden items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-xs text-slate-400 md:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Online
          </div>
        </header>

        {/* Messages */}
        <main className="relative flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
            {messages.length === 0 ? (
              <EmptyState onPick={(prompt) => setInput(prompt)} />
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message as any} />
                ))}

                {isLoading && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400" />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-xl border border-red-800/60 bg-red-950/40 px-4 py-3 text-sm text-red-200 backdrop-blur">
                    <strong>Error:</strong> {error.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Input */}
        <ChatInput
          input={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          onStop={stop}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  const suggestions = [
    { icon: '🐍', text: 'Write a Python function to reverse a string' },
    { icon: '⚛️', text: 'Explain React useEffect with an example' },
    { icon: '🐛', text: 'Debug: Cannot read properties of undefined' },
    { icon: '🚀', text: 'Optimize a SQL query with JOIN and WHERE' },
  ];

  return (
    <div className="mt-12 md:mt-20">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
          <Sparkles size={24} className="text-white" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">
          How can I help you code today?
        </h2>
        <p className="text-sm text-slate-400">
          Ask anything — from quick snippets to full architectures.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onPick(s.text)}
            className="group flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-left text-sm text-slate-300 backdrop-blur transition-all hover:border-slate-700 hover:bg-slate-900/70"
          >
            <span className="text-lg leading-none">{s.icon}</span>
            <span className="group-hover:text-slate-100 transition-colors">
              {s.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}