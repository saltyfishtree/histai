/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { t } from './translations';

export function renderImpactPageContent(): string {
    return `
        <div class="container">
            <h1>${t('impact.title')}</h1>
            <section class="content-section">
                <h2>${t('impact.advancing.title')}</h2>
                <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/research.png" alt="${t('impact.advancing.img_alt')}" class="content-image">
                <p>${t('impact.advancing.p1')}</p>
                
                <h4>${t('impact.advancing.h_researchers')}</h4>
                <p>${t('impact.advancing.p_researchers')}</p>
                <ul>
                    <li>${t('impact.advancing.li_researchers_1')}</li>
                    <li>${t('impact.advancing.li_researchers_2')}</li>
                </ul>

                <h4>${t('impact.advancing.h_educators')}</h4>
                <p>${t('impact.advancing.p_educators')}</p>
                <ul>
                    <li>${t('impact.advancing.li_educators_1')}</li>
                    <li>${t('impact.advancing.li_educators_2')}</li>
                    <li>${t('impact.advancing.li_educators_3')}</li>
                </ul>

                <h4>${t('impact.advancing.h_public')}</h4>
                <p>${t('impact.advancing.p_public')}</p>
                <ul>
                    <li>${t('impact.advancing.li_public_1')}</li>
                    <li>${t('impact.advancing.li_public_2')}</li>
                    <li>${t('impact.advancing.li_public_3')}</li>
                </ul>
            </section>

            <section class="content-section">
                <h2>${t('impact.contributions.title')}</h2>
                
                <h4>${t('impact.contributions.p_histbench')}</h4>
                <p>${t('impact.contributions.p_histbench_desc').replace(/\n/g, '<br>')}</p>
                
                <h4>${t('impact.contributions.p_histagent')}</h4>
                <p>${t('impact.contributions.p_histagent_desc').replace(/\n/g, '<br>')}</p>

                <h4>${t('impact.contributions.p_empirical')}</h4>
                ${t('impact.contributions.perf_table_html')}
            </section>

            <section class="content-section">
                <h2>${t('impact.pushing_frontiers.title')}</h2>
                <p>${t('impact.pushing_frontiers.p1')}</p>
            </section>

            <section class="content-section">
                <h2>${t('impact.future_outlook.title')}</h2>
                <p>${t('impact.future_outlook.p_all')}</p>
            </section>
        </div>
    `;
}