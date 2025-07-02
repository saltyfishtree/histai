/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { create } from 'zustand';
import { Page, Language } from '../types/types';

interface AppState {
  currentPage: Page;
  currentLanguage: Language;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentPage: (page: Page) => void;
  setCurrentLanguage: (lang: Language) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Navigation
  navigateTo: (page: Page, lang?: Language) => void;
  initialize: () => void;
}

// Initialize language helper
function initializeLanguage(): Language {
  const hashLang = window.location.hash.split('_')[1] as Language;
  if (hashLang === 'en' || hashLang === 'zh') {
    return hashLang;
  }
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === 'zh' ? 'zh' : 'en';
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: 'home',
  currentLanguage: initializeLanguage(),
  isLoading: false,
  error: null,

  setCurrentPage: (page: Page) => set({ currentPage: page }),
  
  setCurrentLanguage: (lang: Language) => set({ currentLanguage: lang }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error }),
  
  navigateTo: (page: Page, lang?: Language) => {
    const { currentPage, currentLanguage } = get();
    const targetLang = lang || currentLanguage;
    
    if (currentPage !== page || currentLanguage !== targetLang) {
      set({ 
        currentPage: page, 
        currentLanguage: targetLang 
      });
      window.location.hash = `${page}_${targetLang}`;
    }
    window.scrollTo(0, 0);
  },
  
  initialize: () => {
    const hash = window.location.hash.replace('#', '');
    const parts = hash.split('_');
    const page = (parts[0] || 'home') as Page;
    const lang = (parts[1] || get().currentLanguage) as Language;

    const validPages: Page[] = ['home', 'about', 'histbench', 'impact', 'authors', 'submit'];
    const validLanguages: Language[] = ['en', 'zh'];

    const validatedPage = validPages.includes(page) ? page : 'home';
    const validatedLang = validLanguages.includes(lang) ? lang : get().currentLanguage;
    
    set({ 
      currentPage: validatedPage, 
      currentLanguage: validatedLang 
    });
    
    if (window.location.hash !== `#${validatedPage}_${validatedLang}`) {
      window.location.hash = `${validatedPage}_${validatedLang}`;
    }
  }
})); 