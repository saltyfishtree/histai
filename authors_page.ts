/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { PAPER_LINK, MENGDI_WANG_PROFILE, JIAHAO_QIU_PROFILE, XI_GAO_PROFILE, FULIAN_XIAO_PROFILE } from './config';
import { t } from './translations';


export function renderAuthorsPageContent(): string {
    return `
        <div class="container">
            <h1>${t('authors.title')}</h1>
            
            <section class="content-section">
                <h2>${t('authors.leadership_advisors.title')}</h2>
                <div class="author-profiles">
                    <div class="author-profile-card">
                        <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/mengdi_wang.jpg" alt="${t('authors.mengdi_wang.profile_alt')}" class="author-image">
                         <div class="author-info">
                            <h3>${t('authors.mengdi_wang.name')}</h3>
                            <p class="author-role">${t('authors.mengdi_wang.role')}</p>
                            <p>${t('authors.mengdi_wang.desc')}</p>
                        </div>
                        <a href="${MENGDI_WANG_PROFILE}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary profile-link">${t('authors.view_profile')}</a>
                    </div>
                    <div class="author-profile-card">
                        <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/gaoxi.jpg"}" alt="${t('authors.xi_gao.profile_alt')}" class="author-image">
                         <div class="author-info">
                            <h3>${t('authors.xi_gao.name')}</h3>
                            <p class="author-role">${t('authors.xi_gao.role')}</p>
                            <p>${t('authors.xi_gao.desc')}</p>
                        </div>
                        <a href="${XI_GAO_PROFILE}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary profile-link">${t('authors.view_profile')}</a>
                    </div>
                </div>
            </section>

            <section class="content-section">
                <h2>${t('authors.development_core_team.title')}</h2>
                <div class="author-profiles">
                    <div class="author-profile-card">
                        <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/jiahao_qiu.jpg" alt="${t('authors.jiahao_qiu.profile_alt')}" class="author-image">
                        <div class="author-info">
                            <h3>${t('authors.jiahao_qiu.name')}</h3>
                            <p class="author-role">${t('authors.jiahao_qiu.role')}</p>
                            <p>${t('authors.jiahao_qiu.desc')}</p>
                        </div>
                        <a href="${JIAHAO_QIU_PROFILE}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary profile-link">${t('authors.view_profile')}</a>
                    </div>
                    <div class="author-profile-card">
                        <img src="https://whale-memory.oss-cn-shanghai.aliyuncs.com/test/histagent/resource/fulian_xiao.jpg" alt="${t('authors.fulian_xiao.profile_alt')}" class="author-image">
                        <div class="author-info">
                            <h3>${t('authors.fulian_xiao.name')}</h3>
                            <p class="author-role">${t('authors.fulian_xiao.role')}</p>
                            <p>${t('authors.fulian_xiao.desc')}</p>
                        </div>
                        <a href="${FULIAN_XIAO_PROFILE}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary profile-link">${t('authors.view_profile')}</a>
                    </div>
                </div>
            </section>

            <section class="content-section">
                <h2>${t('authors.additional.title')}</h2>
                <p>${t('authors.additional.p1')}</p>
                <p>${t('authors.additional.p2', { paperLink: PAPER_LINK, linkText: t('authors.additional.p2_link_text') })}</p>
            </section>
        </div>
    `;
}