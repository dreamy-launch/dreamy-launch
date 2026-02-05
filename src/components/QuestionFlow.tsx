'use client';

import { useState } from 'react';
import { FormData } from '@/app/page';

interface QuestionFlowProps {
  onComplete: (data: FormData) => void;
  error: string | null;
}

const questions = [
  {
    id: 'businessName',
    question: "What's your business name?",
    placeholder: 'e.g., Acme Construction',
    type: 'text',
  },
  {
    id: 'industry',
    question: 'What industry are you in?',
    placeholder: 'e.g., Home building, Plumbing, Electrical',
    type: 'text',
  },
  {
    id: 'targetAudience',
    question: 'Who are your ideal customers?',
    placeholder: 'e.g., Homeowners in Auckland looking to renovate',
    type: 'text',
  },
  {
    id: 'problemSolved',
    question: 'What problem do you solve for them?',
    placeholder: 'e.g., We turn outdated homes into modern dream spaces',
    type: 'textarea',
  },
  {
    id: 'keyBenefits',
    question: 'What are 2-3 things that make you different?',
    placeholder: 'e.g., 15 years experience, Fixed-price quotes, 5-star reviews',
    type: 'textarea',
  },
  {
    id: 'callToAction',
    question: 'What do you want visitors to do?',
    placeholder: 'e.g., Get a free quote, Book a consultation, Call now',
    type: 'text',
  },
  {
    id: 'tone',
    question: 'What tone fits your brand?',
    type: 'select',
    options: [
      { value: 'professional', label: 'Professional — Trustworthy and polished' },
      { value: 'casual', label: 'Casual — Friendly and approachable' },
      { value: 'bold', label: 'Bold — Confident and energetic' },
    ],
  },
];

export default function QuestionFlow({ onComplete, error }: QuestionFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    businessName: '',
    industry: '',
    targetAudience: '',
    problemSolved: '',
    keyBenefits: '',
    callToAction: '',
    tone: 'professional',
  });

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers as unknown as FormData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const canContinue = answers[currentQuestion.id]?.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Question Card */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'text' && (
            <input
              type="text"
              value={answers[currentQuestion.id]}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && canContinue && handleNext()}
            />
          )}

          {currentQuestion.type === 'textarea' && (
            <textarea
              value={answers[currentQuestion.id]}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows={4}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              autoFocus
            />
          )}

          {currentQuestion.type === 'select' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange(option.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    answers[currentQuestion.id] === option.value
                      ? 'bg-blue-500/20 border-blue-500 text-white'
                      : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-6 py-3 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canContinue}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed"
          >
            {currentStep === questions.length - 1 ? 'Generate Page' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
