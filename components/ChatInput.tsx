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

  // Auto-grow textarea to fit content (max ~6 lines)
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

  return (
    <div className="border-t border-gray-800 bg-gray-950 px-3 py-3 md:px-4 md:py-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-gray-800 bg-gray-900 p-2 focus-within:border-gray-600 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask me anything about code…"
            className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-gray-100 outline-none placeholder:text-gray-500"
            style={{ maxHeight: 160 }}
          />

          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 transition-colors"
            >
              <Square size={16} fill="white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!input.trim()}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          )}
        </div>

        <p className="mt-2 text-center text-xs text-gray-600 hidden sm:block">
          Press <kbd className="rounded bg-gray-800 px-1 py-0.5 text-[10px]">Enter</kbd> to send,{' '}
          <kbd className="rounded bg-gray-800 px-1 py-0.5 text-[10px]">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}