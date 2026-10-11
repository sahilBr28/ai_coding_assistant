'use client';

import { Plus, X, MessageSquare, Trash2, Sparkles, Search } from 'lucide-react';

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
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-800/60 bg-slate-950/95 backdrop-blur-xl transition-transform duration-200 md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo header */}
        <div className="flex items-center justify-between border-b border-slate-800/60 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              CodePilot
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 md:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* New Chat button */}
        <div className="p-3">
          <button
            onClick={onNewChat}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40"
          >
            <Plus
              size={14}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
            New Chat
          </button>
        </div>

        {/* Search (placeholder — becomes functional in a later step) */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-xs text-slate-500">
            <Search size={12} />
            <span>Search chats…</span>
          </div>
        </div>

        {/* Section label */}
        <div className="px-4 pb-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Recent
          </p>
        </div>

        {/* Chat list */}
        <nav className="flex-1 overflow-y-auto px-2 pb-3">
          {chats.length === 0 ? (
            <p className="px-3 py-4 text-xs text-slate-500">
              No conversations yet. Start a new chat!
            </p>
          ) : (
            <ul className="space-y-0.5">
              {chats.map((chat) => {
                const isActive = activeChatId === chat.id;
                return (
                  <li key={chat.id}>
                    <div
                      className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-slate-800/80 text-slate-100'
                          : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => {
                          onSelectChat(chat.id);
                          onClose();
                        }}
                        className="flex flex-1 items-center gap-2.5 truncate text-left"
                      >
                        <MessageSquare
                          size={14}
                          className={`shrink-0 ${
                            isActive ? 'text-indigo-400' : 'opacity-60'
                          }`}
                        />
                        <span className="truncate">{chat.title}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="rounded p-1 text-slate-500 opacity-0 transition-all hover:bg-slate-800 hover:text-red-400 group-hover:opacity-100"
                        aria-label="Delete chat"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800/60 px-4 py-3">
          <p className="text-[10px] leading-relaxed text-slate-500">
            AI can make mistakes. Verify important code.
          </p>
        </div>
      </aside>
    </>
  );
}