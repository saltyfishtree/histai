/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Page, Language, PageKey } from './types';
import { currentPage, setCurrentPage, currentLanguage, setCurrentLanguage } from './app_state';
import { appHeader, appContent, appFooter } from './dom_elements';
import { renderHeaderContent } from './header';
import { renderFooterContent } from './footer';
import { renderHomePageContent } from './home_page';
import { renderHistBenchPageContent, setupChartEventListeners } from './histbench_page';
import { renderHistAgentPageContent } from './histagent_page';
import { renderImpactPageContent } from './impact_page';
import { renderAuthorsPageContent } from './authors_page';
import { renderSubmitPageContent, setupSubmitPageListeners } from './submit_page';
import { createImageModalStructure, setupImageModalEventListeners } from './image_modal';
import { t } from './translations';

function parseHash(): { page: Page; lang: Language } {
    const hash = window.location.hash.replace('#', '');
    const parts = hash.split('_');
    const page = (parts[0] || 'home') as Page;
    const lang = (parts[1] || currentLanguage) as Language; // Default to current if not in hash

    const validPages: Page[] = ['home', 'about', 'histbench', 'impact', 'authors', 'submit'];
    const validLanguages: Language[] = ['en', 'zh'];

    const validatedPage = validPages.includes(page) ? page : 'home';
    const validatedLang = validLanguages.includes(lang) ? lang : currentLanguage; // Fallback to current or initial
    
    return { page: validatedPage, lang: validatedLang };
}


function navigateTo(page: Page, lang: Language) {
    if (currentPage !== page || currentLanguage !== lang) {
        setCurrentPage(page);
        setCurrentLanguage(lang);
        renderApp();
        window.location.hash = `${page}_${lang}`;
    }
    window.scrollTo(0, 0); // Scroll to top on page change
}

function handleNavigation(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const anchor = target.closest('a'); // Get the anchor if the click was on a child

    if (anchor) {
        const pageAttr = anchor.dataset.page;
        const langAttr = anchor.dataset.lang as Language;

        if (pageAttr) { // Page navigation link
            event.preventDefault();
            const pageName = pageAttr as Page;
            navigateTo(pageName, currentLanguage); // Navigate to new page with current language
        } else if (langAttr) { // Language switcher link
            event.preventDefault();
            navigateTo(currentPage, langAttr); // Navigate to current page with new language
        }
    }
}

export function renderApp() {
    document.documentElement.lang = currentLanguage;
    const pageTitleKey = `page_title.${currentPage}` as PageKey;
    document.title = t(pageTitleKey) || t('site.title');


    appHeader.innerHTML = renderHeaderContent(currentPage);
    
    let contentHTML = '';
    switch (currentPage) {
        case 'home':
            contentHTML = renderHomePageContent();
            break;
        case 'about': 
            contentHTML = renderHistAgentPageContent(); 
            break;
        case 'histbench':
            contentHTML = renderHistBenchPageContent();
            break;
        case 'impact':
            contentHTML = renderImpactPageContent();
            break;
        case 'authors':
            contentHTML = renderAuthorsPageContent();
            break;
        case 'submit':
            contentHTML = renderSubmitPageContent();
            break;
        default:
            setCurrentPage('home'); // Fallback to home
            contentHTML = renderHomePageContent();
    }
    appContent.innerHTML = contentHTML;

    appFooter.innerHTML = renderFooterContent();
    
    // After setting content, attach page-specific listeners
    if (currentPage === 'histbench') {
        setupChartEventListeners();
    }
    if (currentPage === 'submit') {
        setupSubmitPageListeners();
    }


    // Re-attach event listeners
    appHeader.querySelectorAll('nav a, .language-switcher a, .site-title-link').forEach(link => {
        link.removeEventListener('click', handleNavigation); 
        link.addEventListener('click', handleNavigation);
    });
    appContent.querySelectorAll('a[data-page]').forEach(link => {
        link.removeEventListener('click', handleNavigation); 
        link.addEventListener('click', handleNavigation);
    });
}

export function initializeRouter() {
    const { page: initialPage, lang: initialLang } = parseHash();
    
    setCurrentPage(initialPage);
    setCurrentLanguage(initialLang);
    
    if (window.location.hash !== `#${initialPage}_${initialLang}`) {
        window.location.hash = `${initialPage}_${initialLang}`; // Set default hash if not present or malformed
    }
    
    renderApp(); // Initial render based on parsed or default state

    window.addEventListener('hashchange', () => {
        const { page: newPage, lang: newLang } = parseHash();
        if (newPage !== currentPage || newLang !== currentLanguage) {
             navigateTo(newPage, newLang);
        }
    });

    createImageModalStructure();
    setupImageModalEventListeners();
}