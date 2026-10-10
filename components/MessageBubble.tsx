'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'data';
  parts?: Array<{ type: string; text?: string }>;
};

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  // Extract text from parts (AI SDK v7 format)
  const content =
    message.parts
      ?.filter((p) => p.type === 'text')
      .map((p) => p.text)
      .join('') ?? '';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[90%] md:max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? 'bg-blue-600 text-white whitespace-pre-wrap'
            : 'bg-gray-900 border border-gray-800 text-gray-100'
        }`}
      >
        {isUser ? (
          <span>{content}</span>
        ) : (
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const code = String(children).replace(/\n$/, '');

                if (inline) {
                  return (
                    <code
                      className="rounded bg-gray-800 px-1.5 py-0.5 text-[0.85em] text-pink-300"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock language={match?.[1] || 'text'} code={code} />
                );
              },
              p({ children }) {
                return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
              },
              ul({ children }) {
                return <ul className="mb-3 list-disc pl-5 space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="mb-3 list-decimal pl-5 space-y-1">{children}</ol>;
              },
              h1({ children }) {
                return <h1 className="mb-3 mt-4 text-lg font-bold">{children}</h1>;
              },
              h2({ children }) {
                return <h2 className="mb-2 mt-3 text-base font-bold">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="mb-2 mt-3 text-sm font-bold">{children}</h3>;
              },
              a({ href, children }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    {children}
                  </a>
                );
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-2 border-gray-600 pl-3 italic text-gray-400 my-2">
                    {children}
                  </blockquote>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        )}
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
    <div className="my-3 overflow-hidden rounded-lg border border-gray-700 bg-[#282c34]">
      <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5 text-xs text-gray-300">
        <span className="font-mono lowercase">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-xs hover:bg-gray-700 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
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