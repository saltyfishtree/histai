/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Page, Language } from './types';
import { t } from './translations';
import { currentLanguage } from './app_state';

export function renderHeaderContent(currentPage: Page): string {
    const navItems = [
        { page: 'home' as Page, labelKey: 'header.nav.home' },
        { page: 'histbench' as Page, labelKey: 'header.nav.histbench' },
        { page: 'about' as Page, labelKey: 'header.nav.histagent' }, // 'about' is the key for HistAgent page
        { page: 'impact' as Page, labelKey: 'header.nav.impact' },
        { page: 'authors' as Page, labelKey: 'header.nav.team' },
        { page: 'submit' as Page, labelKey: 'header.nav.submit' }
    ];

    let navHTML = '';
    navItems.forEach(item => {
        const isActive = currentPage === item.page;
        navHTML += `<li><a href="#${item.page}_${currentLanguage}" data-page="${item.page}" class="${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>${t(item.labelKey)}</a></li>`;
    });
    
    const otherLanguage: Language = currentLanguage === 'en' ? 'zh' : 'en';
    const langSwitcherHTML = `
        <div class="language-switcher">
            <a href="#${currentPage}_en" data-lang="en" class="${currentLanguage === 'en' ? 'active' : ''}">${t('header.lang.en')}</a>
            <span>|</span>
            <a href="#${currentPage}_zh" data-lang="zh" class="${currentLanguage === 'zh' ? 'active' : ''}">${t('header.lang.zh')}</a>
        </div>
    `;

    return `
        <div class="container">
            <div class="site-title-container">
                <a href="#home_${currentLanguage}" data-page="home" class="site-title-link">
                    <span class="site-title">HistAI</span>
                </a>
            </div>
            <nav>
                <ul>
                    ${navHTML}
                </ul>
            </nav>
            ${langSwitcherHTML}
        </div>
    `;
}