/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { t } from '../../translations';
import { useAppStore } from '../stores/appStore';
import { Button } from '../components/ui/Button';
import { FadeInWhenVisible, StaggerContainer } from '../components/animations/PageTransition';
import { createMotionConfig } from '../utils/motionHelpers';

// Constants
const DEMO_LINK = 'https://historydeepresearch.streamlit.app/';
const GITHUB_LINK = "https://github.com/CharlesQ9/HistAgent";
const PAPER_LINK = "https://arxiv.org/abs/2505.20246";
const DATASET_LINK = "https://huggingface.co/datasets/jiahaoq/HistBench";

function renderDemoIllustration(): string {
  const motionConfig = createMotionConfig('fadeIn', {
    transition: { duration: 1.5, delay: 0.5 }
  });

  return `
    <div class="relative w-full h-64 flex items-center justify-center" data-motion='${motionConfig}'>
      <svg class="w-48 h-48 text-primary-500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Illustration of AI analyzing historical data">
        <defs>
          <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.15" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.3" />
          </linearGradient>
          <filter id="ai-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          </filter>
        </defs>

        <!-- Magnifying glass handle transforming into circuits -->
        <g class="opacity-80">
          <path d="M 144 144 L 186 186" stroke="currentColor" stroke-width="12" stroke-linecap="round" />
          <circle cx="177" cy="177" r="3" fill="currentColor" class="animate-pulse-data" />
          <circle cx="150" cy="150" r="2" fill="currentColor" class="animate-pulse-data" style="animation-delay: 0.5s;" />
        </g>

        <!-- Magnifying glass lens -->
        <g>
          <circle cx="90" cy="90" r="70" fill="url(#glass-gradient)" />
          <circle cx="90" cy="90" r="70" fill="transparent" stroke="currentColor" stroke-width="8" />
        </g>
        
        <!-- Content inside the lens -->
        <g style="pointer-events: none;">
          <!-- Manuscript lines -->
          <path d="M 50 70 q 40 -5, 80 5" stroke="#B08D57" stroke-width="1.5" opacity="0.5" fill="none"/>
          <path d="M 55 90 q 50 2, 85 0" stroke="#B08D57" stroke-width="1.5" opacity="0.5" fill="none"/>
          <path d="M 52 110 q 45 5, 78 -2" stroke="#B08D57" stroke-width="1.5" opacity="0.5" fill="none"/>
          <path d="M 58 130 q 30 -3, 60 3" stroke="#B08D57" stroke-width="1.5" opacity="0.5" fill="none"/>

          <!-- AI data points -->
          <circle cx="110" cy="78" r="2.5" fill="currentColor" class="animate-pulse-data" />
          <circle cx="125" cy="92" r="2" fill="currentColor" class="animate-pulse-data" style="animation-delay: 0.3s;" />
          <circle cx="115" cy="118" r="3" fill="currentColor" class="animate-pulse-data" style="animation-delay: 0.6s;" />
          <circle cx="90" cy="100" r="2.5" fill="currentColor" class="animate-pulse-data" style="animation-delay: 0.9s;" />
          <circle cx="70" cy="85" r="2" fill="currentColor" class="animate-pulse-data" style="animation-delay: 1.2s;" />
        </g>
      </svg>
    </div>
  `;
}

export function renderHomePageContent(): string {
  const { currentLanguage } = useAppStore.getState();

  const heroSection = `
    <section class="relative min-h-[500px] h-[70vh] max-h-[800px] md:min-h-[450px] md:h-[65vh] md:max-h-[700px] lg:min-h-[500px] lg:h-[70vh] lg:max-h-[800px] flex items-center justify-center hero-with-texture overflow-hidden">
      <!-- Background elements -->
      
      <!-- Hero content -->
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        ${FadeInWhenVisible({
          delay: 0.2,
          children: `
            <h1 class="text-5xl md:text-6xl font-bold font-primary text-historical-ink mb-6">
              ${t('home.hero.title')}
            </h1>
          `
        })}
        
        ${FadeInWhenVisible({
          delay: 0.4,
          children: `
            <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              ${t('home.hero.subtitle')}
            </p>
          `
        })}
        
        ${FadeInWhenVisible({
          delay: 0.6,
          children: `
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              ${Button({
                variant: 'primary',
                size: 'lg',
                children: t('home.hero.cta.explore_histbench'),
                dataPage: 'histbench',
                href: `#histbench_${currentLanguage}`,
                className: 'shadow-lg hover:shadow-xl'
              })}
              ${Button({
                variant: 'secondary',
                size: 'lg',
                children: t('home.hero.cta.view_github'),
                href: GITHUB_LINK,
                target: '_blank',
                rel: 'noopener noreferrer'
              })}
            </div>
          `
        })}
      </div>
    </section>
  `;

  const highlightsSection = `
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${StaggerContainer({
          children: `
            <div class="grid md:grid-cols-3 gap-8">
              <a href="#histbench_${currentLanguage}" data-page="histbench" class="group block h-full">
                <div class="bg-white rounded-xl shadow-card hover:shadow-card-hover p-6 transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                                <img src="/resource/histbench_icon.png" 
                   alt="${t('home.icon.histbench_alt')}" 
                   class="w-16 h-18 mb-4 mx-auto">
                  <h3 class="text-xl font-semibold text-center mb-4 text-historical-ink">
                    ${t('home.highlights.histbench.title')}
                  </h3>
                  <p class="text-gray-600 text-center leading-relaxed flex-grow">
                    ${t('home.highlights.histbench.text')}
                  </p>
                </div>
              </a>

              <a href="#about_${currentLanguage}" data-page="about" class="group block h-full">
                <div class="bg-white rounded-xl shadow-card hover:shadow-card-hover p-6 transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                                <img src="/resource/histagent_icon.png" 
                   alt="${t('home.icon.histagent_alt')}" 
                   class="w-16 h-20 mb-4 mx-auto">
                  <h3 class="text-xl font-semibold text-center mb-4 text-historical-ink">
                    ${t('home.highlights.histagent.title')}
                  </h3>
                  <p class="text-gray-600 text-center leading-relaxed flex-grow">
                    ${t('home.highlights.histagent.text')}
                  </p>
                </div>
              </a>

              <a href="#impact_${currentLanguage}" data-page="impact" class="group block h-full">
                <div class="bg-white rounded-xl shadow-card hover:shadow-card-hover p-6 transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
                                <img src="/resource/pioneer.png" 
                   alt="${t('home.icon.research_alt')}" 
                   class="w-16 h-20 mb-4 mx-auto">
                  <h3 class="text-xl font-semibold text-center mb-4 text-historical-ink">
                    ${t('home.highlights.advancing.title')}
                  </h3>
                  <p class="text-gray-600 text-center leading-relaxed flex-grow">
                    ${t('home.highlights.advancing.text')}
                  </p>
                </div>
              </a>
            </div>
          `
        })}
      </div>
    </section>
  `;

  const demoSection = `
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            ${FadeInWhenVisible({
              children: `
                <h2 class="text-3xl font-bold text-historical-ink mb-6">
                  ${t('home.demo_cta.title')}
                </h2>
                <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                  ${t('home.demo_cta.description')}
                </p>
                ${Button({
                  variant: 'primary',
                  size: 'lg',
                  children: t('home.hero.cta.try_demo'),
                  href: DEMO_LINK,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'shadow-lg hover:shadow-xl'
                })}
              `
            })}
          </div>
          <div>
            ${renderDemoIllustration()}
          </div>
        </div>
      </div>
    </section>
  `;

  const deeperSection = `
    <section class="py-16 bg-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        ${FadeInWhenVisible({
          children: `
            <h2 class="text-3xl font-bold text-historical-ink mb-8">
              ${t('home.dive_deeper.title')}
            </h2>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              ${Button({
                variant: 'secondary',
                size: 'lg',
                children: t('home.dive_deeper.cta.read_paper'),
                href: PAPER_LINK,
                target: '_blank',
                rel: 'noopener noreferrer'
              })}
              ${Button({
                variant: 'secondary',
                size: 'lg',
                children: t('home.dive_deeper.cta.access_dataset'),
                href: DATASET_LINK,
                target: '_blank',
                rel: 'noopener noreferrer'
              })}
            </div>
          `
        })}
      </div>
    </section>
  `;

  const contributeSection = `
    <section class="py-16 bg-primary-50 text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        ${FadeInWhenVisible({
          children: `
            <h2 class="text-3xl font-bold text-historical-ink mb-6">
              ${t('home.contribute.title')}
            </h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              ${t('home.contribute.subtitle')}
            </p>
            ${Button({
              variant: 'primary',
              size: 'lg',
              children: t('home.contribute.cta'),
              dataPage: 'submit',
              href: `#submit_${currentLanguage}`,
              className: 'shadow-lg hover:shadow-xl'
            })}
          `
        })}
      </div>
    </section>
  `;

  return `
    <div class="min-h-screen">
      ${heroSection}
      ${highlightsSection}
      ${demoSection}
      ${deeperSection}
      ${contributeSection}
    </div>
  `;
} 