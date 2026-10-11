'use client';

import { useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

type Props = {
  input: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isLoading: boolean;
};

export default function ChatInput({
  input,
  onChange,
  onSubmit,
  onStop,
  isLoading,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) onSubmit();
    }
  };

  const disabled = !input.trim() || isLoading;

  return (
    <div className="border-t border-slate-800/60 bg-slate-950/60 px-4 py-4 backdrop-blur-xl md:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="group relative">
          {/* Glow effect */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-violet-500/0 opacity-0 blur transition-opacity group-focus-within:opacity-100" />

          <div className="relative flex items-end gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-lg shadow-slate-950/50 backdrop-blur focus-within:border-indigo-500/50 transition-colors">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask me anything about code…"
              className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              style={{ maxHeight: 160 }}
            />

            {isLoading ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop generating"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/25 transition-all hover:bg-red-700 hover:shadow-red-600/40"
              >
                <Square size={14} fill="white" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                disabled={disabled}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 disabled:opacity-30 disabled:shadow-none"
              >
                <Send size={14} />
              </button>
            )}
          </div>
        </div>

        <p className="mt-2.5 text-center text-[11px] text-slate-500 hidden sm:block">
          <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5 font-mono">Enter</kbd> send ·{' '}
          <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5 font-mono">Shift + Enter</kbd> new line
        </p>
      </div>
    </div>
  );
}