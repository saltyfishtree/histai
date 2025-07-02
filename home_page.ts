/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GITHUB_LINK, PAPER_LINK, DATASET_LINK, DEMO_LINK } from './config';
import { t } from './translations';
import { currentLanguage } from './app_state';

function renderDemoIllustration(): string {
    // A more modern and symbolic SVG representing AI analyzing history.
    // It features a magnifying glass (research) with digital data points (AI)
    // and a handle that morphs into a circuit.
    return `
    <svg class="demo-cta-illustration" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Illustration of AI analyzing historical data">
        <defs>
            <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--primary-accent)" stop-opacity="0.15" />
                <stop offset="100%" stop-color="var(--primary-accent-hover)" stop-opacity="0.3" />
            </linearGradient>
            <filter id="ai-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            </filter>
        </defs>

        <!-- Magnifying glass handle transforming into circuits -->
        <g class="handle-circuit">
            <path d="M 144 144 L 186 186" stroke="var(--primary-accent)" stroke-width="12" stroke-linecap="round" />
            <circle cx="177" cy="177" r="3" fill="var(--primary-bg)" class="circuit-dot-1" />
            <circle cx="150" cy="150" r="2" fill="var(--primary-bg)" class="circuit-dot-2" />
        </g>

        <!-- Magnifying glass lens -->
        <g class="lens-group">
            <circle cx="90" cy="90" r="70" fill="url(#glass-gradient)" />
            <circle cx="90" cy="90" r="70" fill="transparent" stroke="var(--primary-accent-hover)" stroke-width="8" />
        </g>
        
        <!-- Content inside the lens - Historical fragment turning to data -->
        <g class="lens-content" style="pointer-events: none;">
            <!-- Faint manuscript lines -->
            <path d="M 50 70 q 40 -5, 80 5" stroke="var(--historical-accent-gold)" stroke-width="1.5" opacity="0.5" fill="none"/>
            <path d="M 55 90 q 50 2, 85 0" stroke="var(--historical-accent-gold)" stroke-width="1.5" opacity="0.5" fill="none"/>
            <path d="M 52 110 q 45 5, 78 -2" stroke="var(--historical-accent-gold)" stroke-width="1.5" opacity="0.5" fill="none"/>
            <path d="M 58 130 q 30 -3, 60 3" stroke="var(--historical-accent-gold)" stroke-width="1.5" opacity="0.5" fill="none"/>

            <!-- Glowing AI data points -->
            <circle cx="110" cy="78" r="2.5" fill="var(--primary-bg)" class="data-point" filter="url(#ai-glow)" />
            <circle cx="125" cy="92" r="2" fill="var(--primary-bg)" class="data-point" filter="url(#ai-glow)" />
            <circle cx="115" cy="118" r="3" fill="var(--primary-bg)" class="data-point" filter="url(#ai-glow)" />
            <circle cx="90" cy="100" r="2.5" fill="var(--primary-bg)" class="data-point" filter="url(#ai-glow)" />
            <circle cx="70" cy="85" r="2" fill="var(--primary-bg)" class="data-point" filter="url(#ai-glow)" />
        </g>
    </svg>
    `;
}

export function renderHomePageContent(): string {
    return `
        <div class="container">
            <section class="hero-section">
                <h1>${t('home.hero.title')}</h1>
                <p>${t('home.hero.subtitle')}</p>
                <div class="cta-buttons">
                    <a href="#histbench_${currentLanguage}" class="btn" data-page="histbench">${t('home.hero.cta.explore_histbench')}</a>
                    <a href="${GITHUB_LINK}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">${t('home.hero.cta.view_github')}</a>
                </div>
            </section>

            <section class="key-highlights">
                <a href="#histbench_${currentLanguage}" class="highlight-card-link" data-page="histbench" aria-label="${t('home.highlights.histbench.title')}">
                    <div class="highlight-card">
                        <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/histbench_icon.svg" alt="${t('home.icon.histbench_alt')}" class="highlight-card-icon">
                        <h3>${t('home.highlights.histbench.title')}</h3>
                        <p>${t('home.highlights.histbench.text')}</p>
                    </div>
                </a>
                <a href="#about_${currentLanguage}" class="highlight-card-link" data-page="about" aria-label="${t('home.highlights.histagent.title')}">
                    <div class="highlight-card">
                        <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/histagent_icon.png" alt="${t('home.icon.histagent_alt')}" class="highlight-card-icon">
                        <h3>${t('home.highlights.histagent.title')}</h3>
                        <p>${t('home.highlights.histagent.text')}</p>
                    </div>
                </a>
                <a href="#impact_${currentLanguage}" class="highlight-card-link" data-page="impact" aria-label="${t('home.highlights.advancing.title')}">
                    <div class="highlight-card">
                        <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/pioneer.png" alt="${t('home.icon.research_alt')}" class="highlight-card-icon">
                        <h3>${t('home.highlights.advancing.title')}</h3>
                        <p>${t('home.highlights.advancing.text')}</p>
                    </div>
                </a>
            </section>

            <section class="demo-cta-section">
                <div class="demo-cta-content">
                    <h2>${t('home.demo_cta.title')}</h2>
                    <p>${t('home.demo_cta.description')}</p>
                    <a href="${DEMO_LINK}" target="_blank" rel="noopener noreferrer" class="btn">${t('home.hero.cta.try_demo')}</a>
                </div>
                <div class="demo-cta-illustration-container">
                    ${renderDemoIllustration()}
                </div>
            </section>

             <section class="content-section text-center" style="margin-top: 40px; padding-bottom: 20px;">
                <h2>${t('home.dive_deeper.title')}</h2>
                 <div class="cta-buttons">
                    <a href="${PAPER_LINK}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">${t('home.dive_deeper.cta.read_paper')}</a>
                    <a href="${DATASET_LINK}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">${t('home.dive_deeper.cta.access_dataset')}</a>
                </div>
            </section>

            <section class="content-section text-center contribute-cta-section">
                <h2>${t('home.contribute.title')}</h2>
                <p>${t('home.contribute.subtitle')}</p>
                <a href="#submit_${currentLanguage}" class="btn" data-page="submit">${t('home.contribute.cta')}</a>
            </section>
        </div>
    `;
}