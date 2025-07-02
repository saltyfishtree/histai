/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { t } from '../../../translations';

export function renderHistAgentPageContent(): string { 
    return `
        <div class="container">
            <h1>${t('histagent.title')}</h1>
            <section class="content-section">
                <h2>${t('histagent.needs.title')}</h2>
                <div>
                    <img src="/resource/historycomplexity.png" alt="${t('histagent.needs.img_alt')}" class="content-image">
                </div>
                <p>${t('histagent.needs.p_all')}</p>
            </section>


            <section class="content-section">
                <h2>${t('histagent.tackling.title')}</h2>
                <div class="image-placeholder-container">
                    <img src="/resource/histagent_architecture.png" alt="${t('histagent.tackling.img_alt')}" class="content-image">
                    <p class="caption">${t('histagent.tackling.caption')}</p>
                </div>
                <p>${t('histagent.tackling.p1_new')}</p>
                
                <h4>${t('histagent.tackling.h_arch')}</h4>
                <ul>
                    <li>${t('histagent.tackling.li_arch_1')}</li>
                    <li>${t('histagent.tackling.li_arch_2')}</li>
                    <li>${t('histagent.tackling.li_arch_3')}</li>
                </ul>

                <h4>${t('histagent.tackling.h_caps')}</h4>
                <p>${t('histagent.tackling.p_caps_intro')}</p>
                <ul>
                    <li>${t('histagent.tackling.li_caps_1')}</li>
                    <li>${t('histagent.tackling.li_caps_2')}</li>
                    <li>${t('histagent.tackling.li_caps_3')}</li>
                </ul>
                <p>${t('histagent.tackling.p_caps_outro')}</p>

                <h4>${t('histagent.tackling.h_perf')}</h4>
                <div>
                    <p><strong>${t('histagent.tackling.perf.accuracy.label')}:</strong> ${t('histagent.tackling.perf.accuracy.value')}</p>
                    <p><strong>${t('histagent.tackling.perf.multimodal.label')}:</strong> ${t('histagent.tackling.perf.multimodal.value')}</p>
                    <p><strong>${t('histagent.tackling.perf.context.label')}:</strong> ${t('histagent.tackling.perf.context.value')}</p>
                    <p><strong>${t('histagent.tackling.perf.robustness.label')}:</strong> ${t('histagent.tackling.perf.robustness.value')}</p>
                </div>
                <p>${t('histagent.tackling.p_perf_conclusion')}</p>
            </section>
        </div>
    `;
} 