'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Menu } from 'lucide-react';
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

  // Placeholder chat list (we'll wire it up to real history in a later step)
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
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => setActiveChatId(id)}
        onDeleteChat={() => {}}
      />

      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-gray-800 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold">AI Coding Assistant</h1>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.length === 0 && (
              <div className="mt-20 text-center text-gray-500">
                <p className="text-lg font-medium mb-2">How can I help you code today?</p>
                <p className="text-sm">Ask me to write, debug, or explain code.</p>
              </div>
            )}

            {messages.map((message) => (
              <MessageBubble key={message.id} message={message as any} />
            ))}

            {isLoading && (
              <div className="text-sm text-gray-500">Thinking…</div>
            )}

            {error && (
              <div className="rounded-lg bg-red-900/40 border border-red-700 px-4 py-3 text-sm text-red-200">
                <strong>Error:</strong> {error.message}
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