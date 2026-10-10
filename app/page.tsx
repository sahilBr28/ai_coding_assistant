import Link from 'next/link';
import { Sparkles, Code2, Zap, Shield, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navbar */}
      <header className="border-b border-gray-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-500" size={22} />
            <span className="font-semibold">AI Coding Assistant</span>
          </div>
          <Link
            href="/chat"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center md:pt-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900 px-4 py-1.5 text-xs text-gray-400">
          <Sparkles size={12} className="text-blue-500" />
          Powered by Gemini 3.8 Flash
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Your AI{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            pair programmer
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-400 md:text-lg">
          Write, debug, refactor, and review code with an AI assistant that
          understands your stack. Works beautifully on phone and desktop.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/chat"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors sm:w-auto"
          >
            Start Coding Free
            <ArrowRight size={16} />
          </Link>
          <a
            href="https://ai.google.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl border border-gray-800 px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors sm:w-auto"
          >
            Get an API Key
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Free to use · No credit card required
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<Code2 size={20} className="text-blue-400" />}
            title="Write & Refactor"
            description="Generate clean, modern code in any language. Ask for refactors, tests, or optimizations in one message."
          />
          <FeatureCard
            icon={<Zap size={20} className="text-yellow-400" />}
            title="Live Streaming"
            description="See responses stream in real time. Stop mid-generation, copy code, and iterate fast."
          />
          <FeatureCard
            icon={<Shield size={20} className="text-green-400" />}
            title="Safe by Default"
            description="Proactive warnings for edge cases, security issues, and anti-patterns in every reply."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        Built with Next.js · AI SDK · Gemini
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 transition-colors hover:border-gray-700">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-gray-100">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}