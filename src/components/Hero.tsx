'use client';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <span className="text-5xl">🚀</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Generate a Landing Page
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            in 60 Seconds
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Answer 5 quick questions. Our AI writes the copy, designs the layout, 
          and gives you production-ready code. No templates. No design skills needed.
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25"
        >
          Generate My Page
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Social Proof */}
        <p className="mt-8 text-slate-500 text-sm">
          Free to use • No signup required • Download your code
        </p>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="text-2xl mb-3">✨</div>
            <h3 className="text-white font-semibold mb-2">AI-Powered Copy</h3>
            <p className="text-slate-400 text-sm">
              No more staring at blank pages. Claude writes compelling copy for your business.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="text-2xl mb-3">📱</div>
            <h3 className="text-white font-semibold mb-2">Mobile-First Design</h3>
            <p className="text-slate-400 text-sm">
              Every page looks great on phones, tablets, and desktops. Responsive by default.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="text-2xl mb-3">📦</div>
            <h3 className="text-white font-semibold mb-2">Clean Code</h3>
            <p className="text-slate-400 text-sm">
              Download HTML & CSS that&apos;s easy to customize. Host anywhere you want.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-slate-500 text-sm">
        Built by{' '}
        <a href="https://dreamy.co.nz" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
          Dreamy
        </a>
      </div>
    </div>
  );
}
