/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Page, Language, PageKey } from '../types/types';
import { useAppStore } from '../stores/appStore';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { t } from '../../translations';

// Get DOM elements directly
const appHeader = document.getElementById('app-header')!;
const appContent = document.getElementById('app-content')!;
const appFooter = document.getElementById('app-footer')!;

// Import page components (these will be created/updated)
import { renderHomePageContent } from '../pages/HomePage';
import { renderHistAgentPageContent } from '../pages/core/HistAgentPage';
import { renderHistBenchPageContent, setupChartEventListeners } from '../pages/core/HistBenchPage';
import { renderAuthorsPageContent } from '../pages/about/AuthorsPage';
import { renderSubmitPageContent, setupSubmitPageListeners } from '../pages/contribute/SubmitPage';
import { reinitializeMotion } from '../components/motion/MotionSystem';

class RouterService {
  private store = useAppStore;

  parseHash(): { page: Page; lang: Language } {
    const hash = window.location.hash.replace('#', '');
    const parts = hash.split('_');
    const page = (parts[0] || 'home') as Page;
    const lang = (parts[1] || this.store.getState().currentLanguage) as Language;

    const validPages: Page[] = ['home', 'about', 'histbench', 'authors', 'submit'];
    const validLanguages: Language[] = ['en', 'zh'];

    const validatedPage = validPages.includes(page) ? page : 'home';
    const validatedLang = validLanguages.includes(lang) ? lang : this.store.getState().currentLanguage;
    
    return { page: validatedPage, lang: validatedLang };
  }

  navigateTo(page: Page, lang?: Language): void {
    const { currentPage, currentLanguage } = this.store.getState();
    const targetLang = lang || currentLanguage;
    
    if (currentPage !== page || currentLanguage !== targetLang) {
      this.store.getState().setCurrentPage(page);
      this.store.getState().setCurrentLanguage(targetLang);
      this.renderApp();
      window.location.hash = `${page}_${targetLang}`;
    }
    window.scrollTo(0, 0);
  }

  handleNavigation = (event: Event): void => {
    const target = event.target as HTMLAnchorElement;
    const anchor = target.closest('a');

    if (anchor) {
      const pageAttr = anchor.dataset.page;
      const langAttr = anchor.dataset.lang as Language;

      if (pageAttr) {
        event.preventDefault();
        const pageName = pageAttr as Page;
        this.navigateTo(pageName, this.store.getState().currentLanguage);
      } else if (langAttr) {
        event.preventDefault();
        this.navigateTo(this.store.getState().currentPage, langAttr);
      }
    }
  };

  renderApp(): void {
    const { currentPage, currentLanguage } = this.store.getState();
    
    // Update document language and title
    document.documentElement.lang = currentLanguage;
    const pageTitleKey = `page_title.${currentPage}` as PageKey;
    document.title = t(pageTitleKey) || t('site.title');

    // Render header with new component
    appHeader.innerHTML = Header({ currentPage, currentLanguage });
    
    // Render page content
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
  
      case 'authors':
        contentHTML = renderAuthorsPageContent();
        break;
      case 'submit':
        contentHTML = renderSubmitPageContent();
        break;
      default:
        this.store.getState().setCurrentPage('home');
        contentHTML = renderHomePageContent();
    }
    appContent.innerHTML = contentHTML;

    // Render footer with new component
    appFooter.innerHTML = Footer();
    
    // Setup page-specific event listeners
    this.setupPageListeners(currentPage);
    
    // Setup navigation event listeners
    this.setupNavigationListeners();
    
    // Reinitialize motion system for new content
    reinitializeMotion();
  }

  private setupPageListeners(currentPage: Page): void {
    if (currentPage === 'histbench') {
      setupChartEventListeners();
    }
    if (currentPage === 'submit') {
      setupSubmitPageListeners();
    }
  }

  private setupNavigationListeners(): void {
    // Setup header navigation
    appHeader.querySelectorAll('nav a, .language-switcher a, [data-page="home"]').forEach(link => {
      link.removeEventListener('click', this.handleNavigation); 
      link.addEventListener('click', this.handleNavigation);
    });
    
    // Setup content navigation
    appContent.querySelectorAll('a[data-page]').forEach(link => {
      link.removeEventListener('click', this.handleNavigation); 
      link.addEventListener('click', this.handleNavigation);
    });

    // Setup mobile menu toggle
    this.setupMobileMenu();
  }

  private setupMobileMenu(): void {
    // Add mobile menu toggle function to global scope
    (window as any).toggleMobileMenu = () => {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
      }
    };
  }

  initialize(): void {
    // Initialize app store
    this.store.getState().initialize();
    
    // Initial render
    this.renderApp();

    // Setup hash change listener
    window.addEventListener('hashchange', () => {
      const { page: newPage, lang: newLang } = this.parseHash();
      const { currentPage, currentLanguage } = this.store.getState();
      
      if (newPage !== currentPage || newLang !== currentLanguage) {
        this.navigateTo(newPage, newLang);
      }
    });

    // TODO: Setup image modal when needed
    // createImageModalStructure();
    // setupImageModalEventListeners();
  }
}

// Create singleton instance
export const routerService = new RouterService();

// Export functions for backward compatibility
export function initializeRouter(): void {
  routerService.initialize();
}

export function renderApp(): void {
  routerService.renderApp();
} 