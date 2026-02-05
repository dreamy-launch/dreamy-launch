import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface FormData {
  businessName: string;
  industry: string;
  targetAudience: string;
  problemSolved: string;
  keyBenefits: string;
  callToAction: string;
  tone: 'professional' | 'casual' | 'bold';
}

const toneDescriptions = {
  professional: 'trustworthy, polished, and authoritative',
  casual: 'friendly, warm, and approachable',
  bold: 'confident, energetic, and dynamic',
};

const getAccentColor = (industry: string): string => {
  const industryLower = industry.toLowerCase();
  if (industryLower.includes('construction') || industryLower.includes('building')) return '#f97316'; // orange
  if (industryLower.includes('health') || industryLower.includes('medical')) return '#22c55e'; // green
  if (industryLower.includes('tech') || industryLower.includes('software')) return '#3b82f6'; // blue
  if (industryLower.includes('finance') || industryLower.includes('accounting')) return '#0ea5e9'; // sky
  if (industryLower.includes('legal') || industryLower.includes('law')) return '#6366f1'; // indigo
  if (industryLower.includes('food') || industryLower.includes('restaurant')) return '#ef4444'; // red
  if (industryLower.includes('beauty') || industryLower.includes('salon')) return '#ec4899'; // pink
  return '#3b82f6'; // default blue
};

// Demo fallback when no API key is configured
function generateDemoPage(data: FormData): { html: string; css: string } {
  const accentColor = getAccentColor(data.industry);
  
  return {
    html: `
<header class="hero">
  <nav class="nav">
    <div class="nav-brand">${data.businessName}</div>
    <a href="#contact" class="nav-cta">${data.callToAction}</a>
  </nav>
  <div class="hero-content">
    <h1 class="hero-title">${data.problemSolved}</h1>
    <p class="hero-subtitle">Serving ${data.targetAudience} with excellence and dedication.</p>
    <a href="#contact" class="btn btn-primary">${data.callToAction}</a>
  </div>
</header>

<section class="benefits">
  <div class="container">
    <h2 class="section-title">Why Choose ${data.businessName}?</h2>
    <div class="benefits-grid">
      ${data.keyBenefits.split(',').map((benefit, i) => `
      <div class="benefit-card">
        <div class="benefit-icon">${['⭐', '🎯', '✅'][i % 3]}</div>
        <h3>${benefit.trim()}</h3>
      </div>
      `).join('')}
    </div>
  </div>
</section>

<section class="testimonial">
  <div class="container">
    <blockquote>
      <p>"Working with ${data.businessName} was the best decision we made. Highly recommended!"</p>
      <cite>— Happy Customer</cite>
    </blockquote>
  </div>
</section>

<section id="contact" class="cta-section">
  <div class="container">
    <h2>Ready to Get Started?</h2>
    <p>Contact us today and let's discuss how we can help you.</p>
    <a href="#" class="btn btn-primary btn-lg">${data.callToAction}</a>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <p>© 2026 ${data.businessName}. All rights reserved.</p>
  </div>
</footer>
    `,
    css: `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1f2937;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Navigation */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.nav-cta {
  background: white;
  color: ${accentColor};
  padding: 10px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.nav-cta:hover {
  transform: translateY(-2px);
}

/* Hero */
.hero {
  background: linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: white;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 40px;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: white;
  color: ${accentColor};
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.btn-lg {
  padding: 20px 40px;
  font-size: 1.125rem;
}

/* Benefits */
.benefits {
  padding: 100px 20px;
  background: #f9fafb;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #111827;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.benefit-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.benefit-card h3 {
  font-size: 1.25rem;
  color: #374151;
}

/* Testimonial */
.testimonial {
  padding: 100px 20px;
  background: white;
}

.testimonial blockquote {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.testimonial p {
  font-size: 1.5rem;
  font-style: italic;
  color: #4b5563;
  margin-bottom: 20px;
}

.testimonial cite {
  color: ${accentColor};
  font-weight: 600;
}

/* CTA Section */
.cta-section {
  padding: 100px 20px;
  background: linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%);
  text-align: center;
  color: white;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 40px;
}

/* Footer */
.footer {
  padding: 40px 20px;
  background: #111827;
  color: #9ca3af;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .nav {
    padding: 15px 20px;
  }
  
  .nav-brand {
    font-size: 1.25rem;
  }
  
  .hero {
    min-height: auto;
    padding: 120px 20px 80px;
  }
  
  .benefits, .testimonial, .cta-section {
    padding: 60px 20px;
  }
}
    `
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();
    
    // If no API key, return demo page
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log('No API key configured, returning demo page');
      return NextResponse.json(generateDemoPage(data));
    }

    const accentColor = getAccentColor(data.industry);
    const toneDesc = toneDescriptions[data.tone];

    const prompt = `You are a landing page generator. Create a modern, conversion-focused landing page for:

Business: ${data.businessName}
Industry: ${data.industry}
Target Audience: ${data.targetAudience}
Problem Solved: ${data.problemSolved}
Key Benefits: ${data.keyBenefits}
Call to Action: ${data.callToAction}
Tone: ${toneDesc}
Accent Color: ${accentColor}

Generate the page with these sections:
1. Hero - Compelling headline, subheadline, and CTA button
2. Problem/Solution - Address the pain point and position the business as the solution
3. Benefits - 3 key benefits with icons (use emoji)
4. Social Proof - Placeholder testimonial section
5. Final CTA - Strong closing with clear call to action
6. Footer - Simple footer with business name

Requirements:
- Mobile-responsive design
- Clean, modern aesthetic
- Use the accent color for buttons and highlights
- Include smooth scroll behavior
- Use system fonts for fast loading

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "html": "<the complete HTML body content>",
  "css": "<the complete CSS styles>"
}

The HTML should NOT include <!DOCTYPE>, <html>, <head>, or <body> tags - just the inner content.
The CSS should be complete and self-contained.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse the JSON response
    let result;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      result = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content.text);
      throw new Error('Failed to parse AI response');
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate page' },
      { status: 500 }
    );
  }
}
