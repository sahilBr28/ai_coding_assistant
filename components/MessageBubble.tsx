'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Sparkles, User } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'data';
  parts?: Array<{ type: string; text?: string }>;
};

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  const content =
    message.parts
      ?.filter((p) => p.type === 'text')
      .map((p) => p.text)
      .join('') ?? '';

  return (
    <div className={`group flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-in`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isUser
            ? 'bg-slate-800 ring-1 ring-slate-700'
            : 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-slate-300" />
        ) : (
          <Sparkles size={14} className="text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={`flex-1 min-w-0 ${isUser ? 'flex justify-end' : ''}`}>
        <div
          className={`inline-block max-w-full rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'rounded-tr-sm bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
              : 'rounded-tl-sm border border-slate-800 bg-slate-900/60 text-slate-100 backdrop-blur'
          }`}
        >
          {isUser ? (
            <span className="whitespace-pre-wrap">{content}</span>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const code = String(children).replace(/\n$/, '');
                    if (inline) {
                      return (
                        <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[0.85em] font-mono text-pink-300">
                          {children}
                        </code>
                      );
                    }
                    return <CodeBlock language={match?.[1] || 'text'} code={code} />;
                  },
                  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>,
                  h1: ({ children }) => <h1 className="mb-3 mt-4 text-lg font-bold">{children}</h1>,
                  h2: ({ children }) => <h2 className="mb-2 mt-3 text-base font-bold">{children}</h2>,
                  h3: ({ children }) => <h3 className="mb-2 mt-3 text-sm font-bold">{children}</h3>,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 underline decoration-indigo-400/50 hover:text-indigo-300"
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-2 border-l-2 border-indigo-500/50 pl-3 italic text-slate-400">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-2 text-xs">
        <span className="font-mono lowercase text-slate-400">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span className={copied ? 'text-emerald-400' : ''}>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.8rem',
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}