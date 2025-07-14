/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { t } from '../../../translations';

// Constants
const DATASET_LINK = 'https://huggingface.co/datasets/hist-ai/HistBench';

let tooltipElement: HTMLElement | null = null;

// --- Chart Data ---
const materialTypeData = [
    { id: 'manuscripts', count: 88, labelKey: 'histbench.charts.material.manuscripts' },
    { id: 'visual_materials', count: 96, labelKey: 'histbench.charts.material.visual' },
    { id: 'text_based', count: 64, labelKey: 'histbench.charts.material.text_based' },
    { id: 'ancient_scripts', count: 22, labelKey: 'histbench.charts.material.ancient_scripts' },
    { id: 'maps_schematics', count: 18, labelKey: 'histbench.charts.material.maps_schematics' },
    { id: 'inscriptions', count: 14, labelKey: 'histbench.charts.material.inscriptions' },
    { id: 'charts_diagrams', count: 10, labelKey: 'histbench.charts.material.charts_diagrams' },
    { id: 'mixed_text_image', count: 10, labelKey: 'histbench.charts.material.mixed_text_image' },
    { id: 'audio', count: 9, labelKey: 'histbench.charts.material.audio' },
    { id: 'video', count: 5, labelKey: 'histbench.charts.material.video' },
].sort((a, b) => b.count - a.count);

const languageData = [
    { id: 'english', count: 228, labelKey: 'histbench.charts.language.english' },
    { id: 'chinese', count: 52, labelKey: 'histbench.charts.language.chinese' },
    { id: 'classical_chinese', count: 47, labelKey: 'histbench.charts.language.classical_chinese' },
    { id: 'russian', count: 22, labelKey: 'histbench.charts.language.russian' },
    { id: 'japanese', count: 13, labelKey: 'histbench.charts.language.japanese' },
    { id: 'french', count: 10, labelKey: 'histbench.charts.language.french' },
    { id: 'latin', count: 8, labelKey: 'histbench.charts.language.latin' },
    { id: 'german', count: 8, labelKey: 'histbench.charts.language.german' },
    { id: 'dutch', count: 5, labelKey: 'histbench.charts.language.dutch' },
    { id: 'tibetan', count: 2, labelKey: 'histbench.charts.language.tibetan' },
    { id: 'armenian', count: 2, labelKey: 'histbench.charts.language.armenian' },
    { id: 'arabic', count: 2, labelKey: 'histbench.charts.language.arabic' },
    { id: 'khitan', count: 2, labelKey: 'histbench.charts.language.khitan' },
    { id: 'ancient_greek', count: 2, labelKey: 'histbench.charts.language.ancient_greek' },
    { id: 'khmer', count: 1, labelKey: 'histbench.charts.language.khmer' },
    { id: 'indonesian', count: 1, labelKey: 'histbench.charts.language.indonesian' },
    { id: 'old_tibetan', count: 1, labelKey: 'histbench.charts.language.old_tibetan' },
    { id: 'sanskrit', count: 1, labelKey: 'histbench.charts.language.sanskrit' },
    { id: 'old_uyghur', count: 1, labelKey: 'histbench.charts.language.old_uyghur' },
    { id: 'middle_polish', count: 1, labelKey: 'histbench.charts.language.middle_polish' },
    { id: 'aramaic', count: 1, labelKey: 'histbench.charts.language.aramaic' },
    { id: 'danish', count: 1, labelKey: 'histbench.charts.language.danish' },
    { id: 'bosnian', count: 1, labelKey: 'histbench.charts.language.bosnian' },
    { id: 'italian', count: 1, labelKey: 'histbench.charts.language.italian' },
    { id: 'macedonian', count: 1, labelKey: 'histbench.charts.language.macedonian' },
    { id: 'yukaghir', count: 1, labelKey: 'histbench.charts.language.yukaghir' },
].sort((a, b) => b.count - a.count);

// New, distinct color palettes
const materialColors = ['#4A6B8A', '#7895B2', '#6A8A4A', '#9E6B55', '#607D8B', '#468284', '#A87C7C', '#C8B575', '#3A5570', '#52677B'];
const languageColors = ['#B08D57', '#D4AC79', '#8A6A4A', '#A55B5B', '#D9824F', '#8A4A6B', '#C4B092', '#4E6E58', '#706593', '#A9A9A9'];

// --- INTERACTIVE CHART RENDERING ---

function createPieChartSVG(data: { id: string, count: number, labelKey: string, color: string }[], total: number): string {
    const radius = 100;
    const cx = 125;
    const cy = 125;
    let accumulatedPercent = 0;

    const getCoordinatesForPercent = (percent: number) => {
        const x = cx + radius * Math.cos(2 * Math.PI * percent - Math.PI / 2);
        const y = cy + radius * Math.sin(2 * Math.PI * percent - Math.PI / 2);
        return [x, y];
    };

    const paths = data.map(item => {
        const percent = item.count / total;
        const [startX, startY] = getCoordinatesForPercent(accumulatedPercent);
        accumulatedPercent += percent;
        const [endX, endY] = getCoordinatesForPercent(accumulatedPercent);

        const largeArcFlag = percent > 0.5 ? 1 : 0;

        const pathData = [
            `M ${cx},${cy}`,
            `L ${startX},${startY}`,
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`,
            'Z'
        ].join(' ');

        return `<path d="${pathData}" fill="${item.color}" class="pie-slice" data-id="${item.id}" />`;
    }).join('');

    return `<svg viewBox="0 0 250 250" role="img" aria-label="${t('histbench.charts.pie_chart_alt')}">${paths}</svg>`;
}

function renderDistributionSection(
    titleKey: string, 
    rawData: { id: string, count: number, labelKey: string }[], 
    colors: string[], 
    groupThreshold = 0,
    captionKey?: string
): string {
    let chartData: {id: string, count: number, labelKey: string}[] = [];
    let tableData = [...rawData];
    const totalCount = rawData.reduce((sum, item) => sum + item.count, 0);

    if (groupThreshold > 0) {
        const mainItems = rawData.filter(item => item.count > groupThreshold);
        const otherItems = rawData.filter(item => item.count <= groupThreshold);
        const otherCount = otherItems.reduce((sum, item) => sum + item.count, 0);
        
        chartData.push(...mainItems);
        if (otherCount > 0) {
            chartData.push({ id: 'other', count: otherCount, labelKey: 'histbench.charts.other_label' });
        }
    } else {
        chartData = [...rawData];
    }
    
    const chartDataWithColors = chartData.map((item, index) => ({
        ...item,
        color: colors[index % colors.length]
    }));

    const tableDataWithColors = tableData.map(item => {
        const chartItem = chartDataWithColors.find(ci => ci.id === item.id);
        const color = chartItem ? chartItem.color : chartDataWithColors.find(ci => ci.id === 'other')?.color || '#A9A9A9';
        return {...item, color};
    });

    const pieChartHTML = createPieChartSVG(chartDataWithColors, totalCount);

    const tableRowsHTML = tableDataWithColors.map(item => {
        const chartItemForId = chartDataWithColors.find(ci => ci.id === item.id);
        const highlightId = chartItemForId ? item.id : 'other';
        const percentage = ((item.count / totalCount) * 100).toFixed(2);
        return `
            <tr data-id="${highlightId}" data-full-id="${item.id}">
                <td><span class="color-swatch" style="background-color: ${item.color};"></span>${t(item.labelKey)}</td>
                <td>${item.count.toLocaleString()}</td>
                <td>${percentage}%</td>
            </tr>
        `;
    }).join('');

    const captionHTML = captionKey ? `<p class="caption" style="margin-top: 15px;">${t(captionKey)}</p>` : '';

    return `
        <div class="distribution-section">
            <h4>${t(titleKey)}</h4>
            <div class="distribution-container" data-section-id="${titleKey.replace(/\./g, '-')}">
                <div class="distribution-chart">${pieChartHTML}</div>
                <div class="distribution-table-container">
                    <table class="distribution-table">
                        <thead>
                            <tr>
                                <th>${t('histbench.charts.table_header.category')}</th>
                                <th>${t('histbench.charts.table_header.count')}</th>
                                <th>${t('histbench.charts.table_header.percentage')}</th>
                            </tr>
                        </thead>
                        <tbody>${tableRowsHTML}</tbody>
                    </table>
                </div>
            </div>
            ${captionHTML}
        </div>
    `;
}

export function setupChartEventListeners() {
    if (!document.getElementById('chart-tooltip')) {
        tooltipElement = document.createElement('div');
        tooltipElement.id = 'chart-tooltip';
        document.body.appendChild(tooltipElement);
    } else {
        tooltipElement = document.getElementById('chart-tooltip');
    }

    const sections = document.querySelectorAll('.distribution-container');
    
    sections.forEach(section => {
        const slices = section.querySelectorAll('.pie-slice');
        const rows = section.querySelectorAll('.distribution-table tbody tr');

        const handleMouseOver = (event: MouseEvent) => {
            const target = event.currentTarget as HTMLElement;
            const highlightId = target.dataset.id;
            if (!highlightId || !tooltipElement) return;

            // Highlight elements
            section.querySelectorAll(`[data-id="${highlightId}"]`).forEach(el => el.classList.add('highlight'));
            
            // Dim other slices
            slices.forEach(s => {
                if (s.getAttribute('data-id') !== highlightId) {
                    (s as HTMLElement).style.opacity = '0.5';
                } else {
                    (s as HTMLElement).style.opacity = '1';
                }
            });

            // Show tooltip
            const fullId = target.dataset.fullId || highlightId;
            const dataItem = [...materialTypeData, ...languageData].find(d => d.id === fullId);
            if (dataItem && tooltipElement) {
                tooltipElement.textContent = `${t(dataItem.labelKey)}: ${dataItem.count}`;
                tooltipElement.style.display = 'block';
            }
        };

        const handleMouseOut = () => {
            // Remove highlights
            section.querySelectorAll('[data-id]').forEach(el => el.classList.remove('highlight'));
            
            // Restore opacity
            slices.forEach(s => (s as HTMLElement).style.opacity = '1');
            
            // Hide tooltip
            if (tooltipElement) {
                tooltipElement.style.display = 'none';
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (tooltipElement && tooltipElement.style.display === 'block') {
                tooltipElement.style.left = `${event.pageX + 10}px`;
                tooltipElement.style.top = `${event.pageY - 10}px`;
            }
        };

        slices.forEach(slice => {
            slice.addEventListener('mouseover', handleMouseOver as EventListener);
            slice.addEventListener('mouseout', handleMouseOut);
            slice.addEventListener('mousemove', handleMouseMove as EventListener);
        });

        rows.forEach(row => {
            row.addEventListener('mouseover', handleMouseOver as EventListener);
            row.addEventListener('mouseout', handleMouseOut);
            row.addEventListener('mousemove', handleMouseMove as EventListener);
        });
    });
}

export function renderHistBenchPageContent(): string {
    const languageChartHTML = renderDistributionSection('histbench.linguistic_diversity.title', languageData, languageColors, 5, 'histbench.linguistic_diversity.chart_caption');
    const materialChartHTML = renderDistributionSection('histbench.multimodal_sources.title', materialTypeData, materialColors, 0, 'histbench.multimodal_sources.chart_caption');

    return `
        <div class="container">
            <h1>${t('histbench.title')}</h1>
            
            <section class="content-section">
                <h2>${t('histbench.overview.title')}</h2>
                <p>${t('histbench.overview.p_all')}</p>
            </section>

            <section class="content-section">
                <h3>${t('histbench.deep_dive.title')}</h3>
                <p>${t('histbench.deep_dive.p1')}</p>

                <h4>${t('histbench.reasoning_dimensions.title')}</h4>
                <p>${t('histbench.reasoning_dimensions.p1')}</p>
                <ul>
                    <li>${t('histbench.reasoning_dimensions.li.bibliographic')}</li>
                    <li>${t('histbench.reasoning_dimensions.li.source_id')}</li>
                    <li>${t('histbench.reasoning_dimensions.li.source_proc')}</li>
                    <li>${t('histbench.reasoning_dimensions.li.hist_analysis')}</li>
                    <li>${t('histbench.reasoning_dimensions.li.interdisciplinary')}</li>
                    <li>${t('histbench.reasoning_dimensions.li.cultural_context')}</li>
                </ul>
                
                <h4>${t('histbench.difficulty_levels.title')}</h4>
                <p>${t('histbench.difficulty_levels.p1')}</p>
                <ul>
                    <li>${t('histbench.difficulty_levels.li.basic')}</li>
                    <li>${t('histbench.difficulty_levels.li.intermediate')}</li>
                    <li>${t('histbench.difficulty_levels.li.challenging')}</li>
                </ul>
                <div class="image-placeholder-container">
                    <img src="/resource/HistBenchDifficulty.png" alt="${t('histbench.difficulty_levels.img_alt')}" class="content-image">
                    <p class="caption">${t('histbench.difficulty_levels.caption')}</p>
                </div>

                ${languageChartHTML}

                <p>${t('histbench.linguistic_diversity.p1')}</p>
                <ul>
                    <li>${t('histbench.linguistic_diversity.li.languages')}</li>
                </ul>
                <div class="image-placeholder-container">
                    <img src="/resource/geographicCoverage.png" alt="${t('histbench.linguistic_diversity.map_alt')}" class="content-image">
                    <p class="caption">${t('histbench.linguistic_diversity.map_caption')}</p>
                </div>

                ${materialChartHTML}
                <p>${t('histbench.multimodal_sources.p1')}</p>
                <ul>
                    <li>${t('histbench.multimodal_sources.li.sources')}</li>
                    <li>${t('histbench.multimodal_sources.li.subfields')}</li>
                </ul>

                <h4>${t('histbench.review_pipeline.title')}</h4>
                <p>${t('histbench.review_pipeline.p1')}</p>
                <ul>
                    <li>${t('histbench.review_pipeline.li.stage1')}</li>
                    <li>${t('histbench.review_pipeline.li.stage2')}</li>
                    <li>${t('histbench.review_pipeline.li.stage3')}</li>
                </ul>
                <div class="image-placeholder-container">
                    <img src="/resource/pipeline.png" alt="${t('histbench.review_pipeline.img_alt')}" class="content-image">
                    <p class="caption">${t('histbench.review_pipeline.caption')}</p>
                </div>
                 <p class="text-center" style="margin-top:20px;">
                    <a href="${DATASET_LINK}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">${t('histbench.cta.access_dataset_hf')}</a>
                </p>
            </section>

            <section class="content-section">
                <h2>${t('impact.pushing_frontiers.title')}</h2>
                <p>${t('impact.pushing_frontiers.p1')}</p>
            </section>

            <section class="content-section">
                <h2>${t('impact.future_outlook.title')}</h2>
                <p>${t('impact.future_outlook.p_all')}</p>
            </section>

            <section class="content-section">
                <h2>${t('impact.contributions.title')}</h2>
                
                <h4>${t('impact.contributions.p_histbench')}</h4>
                <p>${t('impact.contributions.p_histbench_desc').replace(/\n/g, '<br>')}</p>

                <h4>${t('impact.contributions.p_empirical')}</h4>
                ${t('impact.contributions.perf_table_html')}
            </section>
        </div>
    `;
} 