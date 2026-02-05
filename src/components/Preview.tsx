'use client';

import { useState, useRef } from 'react';

interface PreviewProps {
  html: string;
  css: string;
  onReset: () => void;
  businessName: string;
}

export default function Preview({ html, css, onReset, businessName }: PreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName}</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

  const handleDownload = () => {
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessName.toLowerCase().replace(/\s+/g, '-')}-landing-page.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(fullHtml);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Start Over
            </button>
            <span className="text-white font-semibold">{businessName}</span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1">
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                viewMode === 'desktop' 
                  ? 'bg-slate-700 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                viewMode === 'mobile' 
                  ? 'bg-slate-700 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg transition-colors text-sm"
            >
              Copy Code
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download HTML
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-slate-900 p-4 md:p-8 overflow-auto">
        <div className={`mx-auto transition-all duration-300 ${
          viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-5xl'
        }`}>
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <iframe
              ref={iframeRef}
              srcDoc={fullHtml}
              className="w-full h-[800px] border-0"
              title="Landing Page Preview"
            />
          </div>
        </div>
      </div>

      {/* Upsell Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div>
            <p className="font-semibold">Want a working contact form?</p>
            <p className="text-blue-100 text-sm">Upgrade to Pro and start capturing leads immediately.</p>
          </div>
          <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
            Upgrade to Pro — $99
          </button>
        </div>
      </div>
    </div>
  );
}
