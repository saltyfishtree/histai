/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Page, Language } from '../../types/types';
import { t } from '../../../translations';
import { createMotionConfig } from '../../utils/motionHelpers';

interface HeaderProps {
  currentPage: Page;
  currentLanguage: Language;
}

export function Header({ currentPage, currentLanguage }: HeaderProps): string {
  const navItems = [
    { page: 'home' as Page, labelKey: 'header.nav.home' },
    { page: 'histbench' as Page, labelKey: 'header.nav.histbench' },
    { page: 'about' as Page, labelKey: 'header.nav.histagent' },
    { page: 'authors' as Page, labelKey: 'header.nav.team' },
    { page: 'submit' as Page, labelKey: 'header.nav.submit' }
  ];

  const motionConfig = createMotionConfig('fadeIn');

  let navHTML = '';
  navItems.forEach(item => {
    const isActive = currentPage === item.page;
    const activeClasses = isActive 
      ? 'text-primary-600 border-b-2 border-primary-500' 
      : 'text-gray-700 hover:text-primary-600';
    
    navHTML += `
      <li>
        <a href="#${item.page}_${currentLanguage}" 
           data-page="${item.page}" 
           class="relative py-2 px-1 font-medium transition-colors duration-200 ${activeClasses}"
           ${isActive ? 'aria-current="page"' : ''}>
          ${t(item.labelKey)}
        </a>
      </li>
    `;
  });

  const langSwitcherHTML = `
    <div class="flex items-center space-x-2 text-sm">
      <a href="#${currentPage}_en" 
         data-lang="en" 
         class="px-2 py-1 rounded transition-colors duration-200 ${
           currentLanguage === 'en' 
             ? 'bg-primary-100 text-primary-700 font-medium' 
             : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
         }">
        ${t('header.lang.en')}
      </a>
      <span class="text-gray-400">|</span>
      <a href="#${currentPage}_zh" 
         data-lang="zh" 
         class="px-2 py-1 rounded transition-colors duration-200 ${
           currentLanguage === 'zh' 
             ? 'bg-primary-100 text-primary-700 font-medium' 
             : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
         }">
        ${t('header.lang.zh')}
      </a>
    </div>
  `;

  return `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
            data-motion='${motionConfig}'>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-center h-16">
          <!-- Logo/Title -->
          <div class="absolute left-0 flex-shrink-0">
            <a href="#home_${currentLanguage}" 
               data-page="home" 
               class="text-2xl font-bold font-primary text-historical-ink hover:text-primary-600 transition-colors duration-200">
              HistAI
            </a>
          </div>

          <!-- Desktop Navigation - Centered -->
          <nav class="hidden md:block">
            <ul class="flex items-center space-x-8">
              ${navHTML}
            </ul>
          </nav>

          <!-- Language Switcher -->
          <div class="absolute right-0 hidden md:block">
            ${langSwitcherHTML}
          </div>

          <!-- Mobile menu button -->
          <div class="absolute right-0 md:hidden">
            <button type="button" 
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                    onclick="toggleMobileMenu()">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div id="mobile-menu" class="md:hidden hidden border-t border-gray-200 py-4">
          <div class="space-y-2">
            ${navItems.map(item => {
              const isActive = currentPage === item.page;
              const activeClasses = isActive 
                ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500' 
                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50';
              
              return `
                <a href="#${item.page}_${currentLanguage}" 
                   data-page="${item.page}" 
                   class="block px-4 py-3 text-base font-medium transition-colors duration-200 ${activeClasses}"
                   ${isActive ? 'aria-current="page"' : ''}>
                  ${t(item.labelKey)}
                </a>
              `;
            }).join('')}
            
            <!-- Mobile Language Switcher -->
            <div class="px-4 py-3 border-t border-gray-200 mt-4">
              <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-gray-700">Language:</span>
                ${langSwitcherHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
} 