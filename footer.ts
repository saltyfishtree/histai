/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GITHUB_LINK, PAPER_LINK, DATASET_LINK } from './config';
import { t } from './translations';

export function renderFooterContent(): string {
    const currentYear = new Date().getFullYear();
    return `
        <div class="container">
            <p>${t('footer.copyright', { currentYear })}</p>
            <p>
                <a href="${GITHUB_LINK}" target="_blank" rel="noopener noreferrer">${t('footer.link.github')}</a> |
                <a href="${PAPER_LINK}" target="_blank" rel="noopener noreferrer">${t('footer.link.paper')}</a> |
                <a href="${DATASET_LINK}" target="_blank" rel="noopener noreferrer">${t('footer.link.dataset')}</a>
            </p>
        </div>
    `;
}
