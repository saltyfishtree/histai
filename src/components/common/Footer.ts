/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { t } from '../../../translations';
import { createMotionConfig } from '../../utils/motionHelpers';

// Constants for footer links
const GITHUB_LINK = 'https://github.com/hist-ai/histbench';
const PAPER_LINK = 'https://arxiv.org/abs/2412.01129';
const DATASET_LINK = 'https://huggingface.co/datasets/hist-ai/HistBench';

export function Footer(): string {
  const currentYear = new Date().getFullYear();
  const motionConfig = createMotionConfig('fadeIn');

  const footerLinks = [
    { href: GITHUB_LINK, labelKey: 'footer.link.github' },
    { href: PAPER_LINK, labelKey: 'footer.link.paper' },
    { href: DATASET_LINK, labelKey: 'footer.link.dataset' }
  ];

  const linksHTML = footerLinks.map(link => `
    <a href="${link.href}" 
       target="_blank" 
       rel="noopener noreferrer"
       class="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
      ${t(link.labelKey)}
    </a>
  `).join('<span class="text-gray-500 mx-2">|</span>');

  return `
    <footer class="bg-historical-ink text-gray-300 py-8 mt-auto"
            data-motion='${motionConfig}'>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-4">
          <!-- Copyright -->
          <p class="text-sm">
            ${t('footer.copyright', { currentYear })}
          </p>
          
          <!-- Links -->
          <div class="flex flex-wrap justify-center items-center text-sm">
            ${linksHTML}
          </div>
          
          <!-- Optional additional info -->
          <div class="pt-4 border-t border-gray-600">
            <p class="text-xs text-gray-400">
              Advancing AI for Historical Understanding
            </p>
          </div>
        </div>
      </div>
    </footer>
  `;
} 