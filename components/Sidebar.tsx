'use client';

import { Plus, X, MessageSquare, Trash2 } from 'lucide-react';

type Chat = {
  id: string;
  title: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
};

export default function Sidebar({
  open,
  onClose,
  onNewChat,
  chats,
  activeChatId,
  onSelectChat,
  onDeleteChat,
}: Props) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-gray-800 bg-gray-950 transition-transform duration-200 md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-200">Chats</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* New Chat button */}
        <div className="p-3">
          <button
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Chat list */}
        <nav className="flex-1 overflow-y-auto px-2 pb-3">
          {chats.length === 0 ? (
            <p className="px-3 py-4 text-xs text-gray-500">
              No conversations yet. Start a new chat!
            </p>
          ) : (
            <ul className="space-y-1">
              {chats.map((chat) => (
                <li key={chat.id}>
                  <div
                    className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeChatId === chat.id
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-900'
                    }`}
                  >
                    <button
                      onClick={() => {
                        onSelectChat(chat.id);
                        onClose();
                      }}
                      className="flex flex-1 items-center gap-2 truncate text-left"
                    >
                      <MessageSquare size={14} className="shrink-0" />
                      <span className="truncate">{chat.title}</span>
                    </button>
                    <button
                      onClick={() => onDeleteChat(chat.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-0.5 text-gray-500 hover:bg-gray-700 hover:text-red-400"
                      aria-label="Delete chat"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 px-4 py-3 text-xs text-gray-500">
          AI can make mistakes. Verify important code.
        </div>
      </aside>
    </>
  );
}