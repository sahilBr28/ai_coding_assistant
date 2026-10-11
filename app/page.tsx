import Link from 'next/link';
import { Sparkles, Code2, Zap, Shield, ArrowRight, Terminal } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Navbar */}
      <header className="relative z-10 border-b border-slate-800/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight">CodePilot</span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#features" className="hover:text-slate-100 transition-colors">
              Features
            </a>
            <a href="#how" className="hover:text-slate-100 transition-colors">
              How it works
            </a>
          </nav>

          <Link
            href="/chat"
            className="group flex items-center gap-1.5 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium ring-1 ring-inset ring-white/10 backdrop-blur hover:bg-white/10 transition-all"
          >
            Open App
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 text-center md:pt-32">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 text-xs text-slate-400 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Powered by Gemini 3.8 Flash
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Your AI{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            pair programmer
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 leading-relaxed">
          Write, debug, refactor, and review code at the speed of thought.
          Built for developers who ship.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/chat"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all sm:w-auto"
          >
            Start Coding Free
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <a
            href="https://github.com/sahilBr28"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-7 py-3.5 text-sm font-medium text-slate-300 backdrop-blur hover:bg-slate-800/50 transition-all sm:w-auto"
          >
            <GithubIcon size={16} />
            View on GitHub
          </a>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          No credit card · Free forever · Open source
        </p>
      </section>

      {/* Mockup preview */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24">
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl shadow-indigo-500/10 backdrop-blur">
          <div className="rounded-xl bg-slate-950/80 p-4 md:p-6">
            {/* Fake window bar */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <div className="ml-3 flex items-center gap-1.5 text-xs text-slate-500">
                <Terminal size={12} />
                codepilot
              </div>
            </div>

            {/* Fake chat */}
            <div className="space-y-3 text-left text-sm">
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-2.5 text-white shadow-lg shadow-indigo-500/20">
                  Write a Python function to reverse a string
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-slate-800 bg-slate-900 px-4 py-2.5">
                  <p className="mb-2 text-slate-300">
                    Here&apos;s a clean implementation:
                  </p>
                  <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-emerald-400 font-mono">
{`def reverse(s: str) -> str:
    return s[::-1]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to ship faster
          </h2>
          <p className="text-slate-400">Built for real workflows, not demos.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<Code2 size={20} />}
            color="indigo"
            title="Write & Refactor"
            description="Generate production-ready code in any language. Refactor, add tests, and optimize in one message."
          />
          <FeatureCard
            icon={<Zap size={20} />}
            color="amber"
            title="Live Streaming"
            description="Watch responses generate in real time. Stop mid-stream, copy code, iterate without waiting."
          />
          <FeatureCard
            icon={<Shield size={20} />}
            color="emerald"
            title="Production Aware"
            description="Flags edge cases, security pitfalls, and anti-patterns before they hit your users."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-12 backdrop-blur">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to ship?</h2>
          <p className="mb-8 text-slate-400">
            Start coding with AI in seconds. No setup, no credit card.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
          >
            Open the App
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-8 text-center text-xs text-slate-500">
        Built with Next.js, AI SDK, and Gemini
      </footer>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function FeatureCard({
  icon,
  color,
  title,
  description,
}: {
  icon: React.ReactNode;
  color: 'indigo' | 'amber' | 'emerald';
  title: string;
  description: string;
}) {
  const colorMap = {
    indigo:
      'from-indigo-500/20 to-indigo-500/5 text-indigo-400 ring-indigo-500/20',
    amber:
      'from-amber-500/20 to-amber-500/5 text-amber-400 ring-amber-500/20',
    emerald:
      'from-emerald-500/20 to-emerald-500/5 text-emerald-400 ring-emerald-500/20',
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur transition-all hover:border-slate-700 hover:bg-slate-900/60">
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ring-inset ${colorMap[color]}`}
      >
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

/**
 * Inline GitHub icon.
 * lucide-react v1+ removed brand icons, so we ship our own SVG.
 */
function GithubIcon({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9-.1-.7-.1-1.6-.1-2.4-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2 0 1.6-.1 2.9-.1 3.3 0 .3.2.7.8.6C19.2 21.4 23.5 17.1 23.5 12 23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}