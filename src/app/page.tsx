'use client';

import { useState } from 'react';
import QuestionFlow from '@/components/QuestionFlow';
import Preview from '@/components/Preview';
import Hero from '@/components/Hero';

export interface FormData {
  businessName: string;
  industry: string;
  targetAudience: string;
  problemSolved: string;
  keyBenefits: string;
  callToAction: string;
  tone: 'professional' | 'casual' | 'bold';
}

export default function Home() {
  const [step, setStep] = useState<'hero' | 'questions' | 'generating' | 'preview'>('hero');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [generatedPage, setGeneratedPage] = useState<{ html: string; css: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStep('questions');
  };

  const handleFormComplete = async (data: FormData) => {
    setFormData(data);
    setStep('generating');
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to generate page');
      }

      const result = await response.json();
      setGeneratedPage(result);
      setStep('preview');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setStep('questions');
    }
  };

  const handleReset = () => {
    setStep('hero');
    setFormData(null);
    setGeneratedPage(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {step === 'hero' && <Hero onStart={handleStart} />}
      
      {step === 'questions' && (
        <QuestionFlow onComplete={handleFormComplete} error={error} />
      )}
      
      {step === 'generating' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Generating your landing page...</h2>
            <p className="text-slate-400">This usually takes 10-20 seconds</p>
          </div>
        </div>
      )}
      
      {step === 'preview' && generatedPage && (
        <Preview 
          html={generatedPage.html} 
          css={generatedPage.css} 
          onReset={handleReset}
          businessName={formData?.businessName || 'Your Business'}
        />
      )}
    </main>
  );
}
