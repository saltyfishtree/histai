/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Page, Language } from './types';

export let currentPage: Page = 'home';
export let currentLanguage: Language = initialize(); // Initialize language

function initialize(): Language {
    const hashLang = window.location.hash.split('_')[1] as Language;
    if (hashLang === 'en' || hashLang === 'zh') {
        return hashLang;
    }
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === 'zh' ? 'zh' : 'en';
}

export function setCurrentPage(page: Page) {
    currentPage = page;
}

export function setCurrentLanguage(lang: Language) {
    currentLanguage = lang;
}
