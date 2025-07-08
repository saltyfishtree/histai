/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from "@google/genai";
import { t } from '../../../translations';
import { submitToFirestore, validateSubmissionData } from '../../services/firebase/submissionService';
import { FormData } from '../../types/types';

const IMAGE_BASE_URL = "/resource/questions/";

interface SampleImageDetail {
    fileName: string;
    altKey: string;
    captionKey: string;
}

interface SampleQuestionDetail {
    id: string; // e.g., "l1q1"
    titleKey: string;
    difficultyDisplayKey: string;
    answerTypeKey: string;
    questionKey: string;
    dataKey: string;
    answerKey: string; // For Exact Match or Correct Option for MC
    explanationKey: string;
    sourceReferenceKey: string;
    options?: { [key: string]: string }; // For Multiple Choice (e.g., option_a_key, option_b_key)
    correctAnswerKey?: string; // For MC to display the correct option letter
    images?: SampleImageDetail[];
}

interface LevelSampleSet {
    level: number;
    titleKey: string; // e.g., 'histbench.samples.level1_title'
    questions: SampleQuestionDetail[];
}

const sampleDataByLevel: LevelSampleSet[] = [
    {
        level: 1,
        titleKey: 'histbench.samples.level1_title',
        questions: [
            {
                id: 'l1q1',
                titleKey: 'histbench.samples.level1.q1.title',
                difficultyDisplayKey: 'histbench.samples.level1.q1.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level1.q1.answer_type',
                questionKey: 'histbench.samples.level1.q1.question',
                dataKey: 'histbench.samples.level1.q1.data',
                answerKey: 'histbench.samples.level1.q1.answer',
                explanationKey: 'histbench.samples.level1.q1.explanation',
                sourceReferenceKey: 'histbench.samples.level1.q1.source_reference',
                images: [
                    { fileName: 'level_1_1.png', altKey: 'histbench.samples.level1.q1.image1_alt', captionKey: 'histbench.samples.level1.q1.image1_caption' }
                ]
            },
            {
                id: 'l1q2',
                titleKey: 'histbench.samples.level1.q2.title',
                difficultyDisplayKey: 'histbench.samples.level1.q2.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level1.q2.answer_type',
                questionKey: 'histbench.samples.level1.q2.question',
                dataKey: 'histbench.samples.level1.q2.data',
                answerKey: 'histbench.samples.level1.q2.answer',
                explanationKey: 'histbench.samples.level1.q2.explanation',
                sourceReferenceKey: 'histbench.samples.level1.q2.source_reference',
            }
        ]
    },
    {
        level: 2,
        titleKey: 'histbench.samples.level2_title',
        questions: [
            {
                id: 'l2q1',
                titleKey: 'histbench.samples.level2.q1.title',
                difficultyDisplayKey: 'histbench.samples.level2.q1.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level2.q1.answer_type',
                questionKey: 'histbench.samples.level2.q1.question',
                dataKey: 'histbench.samples.level2.q1.data',
                answerKey: 'histbench.samples.level2.q1.correct_answer', // Use this for displaying the correct option letter
                explanationKey: 'histbench.samples.level2.q1.explanation',
                sourceReferenceKey: 'histbench.samples.level2.q1.source_reference',
                options: {
                    a: 'histbench.samples.level2.q1.option_a',
                    b: 'histbench.samples.level2.q1.option_b',
                    c: 'histbench.samples.level2.q1.option_c',
                    d: 'histbench.samples.level2.q1.option_d',
                },
                correctAnswerKey: 'histbench.samples.level2.q1.correct_answer',
                images: [
                    { fileName: 'level_2_3.png', altKey: 'histbench.samples.level2.q1.image1_alt', captionKey: 'histbench.samples.level2.q1.image1_caption' }
                ]
            },
            {
                id: 'l2q2',
                titleKey: 'histbench.samples.level2.q2.title',
                difficultyDisplayKey: 'histbench.samples.level2.q2.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level2.q2.answer_type',
                questionKey: 'histbench.samples.level2.q2.question',
                dataKey: 'histbench.samples.level2.q2.data',
                answerKey: 'histbench.samples.level2.q2.answer',
                explanationKey: 'histbench.samples.level2.q2.explanation',
                sourceReferenceKey: 'histbench.samples.level2.q2.source_reference',
                images: [
                    { fileName: 'level_2_4.png', altKey: 'histbench.samples.level2.q2.image1_alt', captionKey: 'histbench.samples.level2.q2.image1_caption' }
                ]
            }
        ]
    },
    {
        level: 3,
        titleKey: 'histbench.samples.level3_title',
        questions: [
            {
                id: 'l3q1',
                titleKey: 'histbench.samples.level3.q1.title',
                difficultyDisplayKey: 'histbench.samples.level3.q1.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level3.q1.answer_type',
                questionKey: 'histbench.samples.level3.q1.question',
                dataKey: 'histbench.samples.level3.q1.data',
                answerKey: 'histbench.samples.level3.q1.answer',
                explanationKey: 'histbench.samples.level3.q1.explanation',
                sourceReferenceKey: 'histbench.samples.level3.q1.source_reference',
            },
            {
                id: 'l3q2',
                titleKey: 'histbench.samples.level3.q2.title',
                difficultyDisplayKey: 'histbench.samples.level3.q2.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level3.q2.answer_type',
                questionKey: 'histbench.samples.level3.q2.question',
                dataKey: 'histbench.samples.level3.q2.data',
                answerKey: 'histbench.samples.level3.q2.correct_answer',
                explanationKey: 'histbench.samples.level3.q2.explanation',
                sourceReferenceKey: 'histbench.samples.level3.q2.source_reference',
                options: {
                    a: 'histbench.samples.level3.q2.option_a',
                    b: 'histbench.samples.level3.q2.option_b',
                    c: 'histbench.samples.level3.q2.option_c',
                    d: 'histbench.samples.level3.q2.option_d',
                    e: 'histbench.samples.level3.q2.option_e',
                    f: 'histbench.samples.level3.q2.option_f',
                    g: 'histbench.samples.level3.q2.option_g',
                },
                correctAnswerKey: 'histbench.samples.level3.q2.correct_answer',
            },
            {
                id: 'l3q3',
                titleKey: 'histbench.samples.level3.q3.title',
                difficultyDisplayKey: 'histbench.samples.level3.q3.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level3.q3.answer_type',
                questionKey: 'histbench.samples.level3.q3.question',
                dataKey: 'histbench.samples.level3.q3.data',
                answerKey: 'histbench.samples.level3.q3.correct_answer',
                explanationKey: 'histbench.samples.level3.q3.explanation',
                sourceReferenceKey: 'histbench.samples.level3.q3.source_reference',
                options: {
                    a: 'histbench.samples.level3.q3.option_a',
                    b: 'histbench.samples.level3.q3.option_b',
                    c: 'histbench.samples.level3.q3.option_c',
                    d: 'histbench.samples.level3.q3.option_d',
                    e: 'histbench.samples.level3.q3.option_e',
                },
                correctAnswerKey: 'histbench.samples.level3.q3.correct_answer',
                images: [
                    { fileName: 'level_3_2_1.png', altKey: 'histbench.samples.level3.q3.image1_alt', captionKey: 'histbench.samples.level3.q3.image1_caption' },
                    { fileName: 'level_3_2_2.png', altKey: 'histbench.samples.level3.q3.image2_alt', captionKey: 'histbench.samples.level3.q3.image2_caption' }
                ]
            },
            {
                id: 'l3q4',
                titleKey: 'histbench.samples.level3.q4.title',
                difficultyDisplayKey: 'histbench.samples.level3.q4.difficulty_level_display',
                answerTypeKey: 'histbench.samples.level3.q4.answer_type',
                questionKey: 'histbench.samples.level3.q4.question',
                dataKey: 'histbench.samples.level3.q4.data',
                answerKey: 'histbench.samples.level3.q4.correct_answer',
                explanationKey: 'histbench.samples.level3.q4.explanation',
                sourceReferenceKey: 'histbench.samples.level3.q4.source_reference',
                options: {
                    a: 'histbench.samples.level3.q4.option_a',
                    b: 'histbench.samples.level3.q4.option_b',
                    c: 'histbench.samples.level3.q4.option_c',
                    d: 'histbench.samples.level3.q4.option_d',
                    e: 'histbench.samples.level3.q4.option_e',
                },
                correctAnswerKey: 'histbench.samples.level3.q4.correct_answer',
            }
        ]
    }
];

function renderSingleQuestionDetail(question: SampleQuestionDetail): string {
    let imagesHTML = '';
    if (question.images && question.images.length > 0) {
        imagesHTML += '<div class="sample-question-image-gallery">';
        question.images.forEach(img => {
            imagesHTML += `
                <div class="sample-question-image-item">
                    <img src="${IMAGE_BASE_URL}${img.fileName}" 
                         alt="${t(img.altKey)}" 
                         data-caption="${t(img.captionKey)}" 
                         class="sample-question-image modal-trigger modal-trigger-image" 
                         loading="lazy">
                    <p class="caption">${t(img.captionKey)}</p>
                </div>`;
        });
        imagesHTML += '</div>';
    }

    let optionsHTML = '';
    if (question.options) {
        optionsHTML += `<p><strong>${t('histbench.samples.options_label')}:</strong></p><ul>`;
        for (const key in question.options) {
            optionsHTML += `<li>${t(question.options[key])}</li>`;
        }
        optionsHTML += `</ul>`;
    }
    
    const answerLabel = question.correctAnswerKey ? t('histbench.samples.correct_answer_label') : t('histbench.samples.answer_label');

    return `
        <h4>${t(question.titleKey)}</h4>
        <div class="sample-question-details">
            <p><span class="sample-question-level-badge level-${question.difficultyDisplayKey.includes('1') ? '1' : question.difficultyDisplayKey.includes('2') ? '2' : '3'}">${t(question.difficultyDisplayKey)}</span></p>
            <p><strong>${t('histbench.samples.answer_type_label')}:</strong> ${t(question.answerTypeKey)}</p>
            <p><strong>${t('histbench.samples.question_label')}:</strong> ${t(question.questionKey)}</p>
            <p><strong>${t('histbench.samples.data_label')}:</strong></p>
            <pre>${t(question.dataKey)}</pre>
            ${imagesHTML}
            ${optionsHTML}
            <p><strong>${answerLabel}:</strong> ${t(question.answerKey)}</p>
            <p><strong>${t('histbench.samples.explanation_label')}:</strong> ${t(question.explanationKey)}</p>
            <p><strong>${t('histbench.samples.source_reference_label')}:</strong> ${t(question.sourceReferenceKey)}</p>
        </div>
    `;
}

let currentStep = 1;
const totalSteps = 3;

// State to track current question index for each level in submit page
let submitPageQuestionIndices: { [level: number]: number } = {};

function updateSubmitQuestionDisplay(level: number) {
    const levelSet = sampleDataByLevel.find(ls => ls.level === level);
    if (!levelSet) return;

    const displayArea = document.getElementById(`submit-sample-question-display-level-${level}`) as HTMLElement;
    const navContainer = document.getElementById(`submit-sample-nav-level-${level}`) as HTMLElement;
    if (!displayArea || !navContainer) return;

    const currentIndex = submitPageQuestionIndices[level];
    const totalQuestions = levelSet.questions.length;
    const question = levelSet.questions[currentIndex];

    displayArea.classList.add('fade-out');

    setTimeout(() => {
        displayArea.innerHTML = renderSingleQuestionDetail(question);
        
        const counterElement = navContainer.querySelector('.sample-question-counter') as HTMLElement;
        if (counterElement) {
            counterElement.textContent = t('histbench.samples.question_counter', { current: currentIndex + 1, total: totalQuestions });
        }

        const prevBtn = navContainer.querySelector('.prev-btn') as HTMLButtonElement;
        const nextBtn = navContainer.querySelector('.next-btn') as HTMLButtonElement;
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalQuestions - 1;
        
        displayArea.classList.remove('fade-out');
    }, 200);
}

function handleSubmitSampleNavClick(event: Event) {
    const target = event.target as HTMLElement;
    const button = target.closest<HTMLButtonElement>('.nav-btn');
    if (!button) return;
    
    const level = parseInt(button.dataset.level || '0', 10);
    const action = button.dataset.action;
    
    if (!level || !action || !submitPageQuestionIndices.hasOwnProperty(level)) return;

    const levelSet = sampleDataByLevel.find(ls => ls.level === level);
    if (!levelSet) return;

    if (action === 'next' && submitPageQuestionIndices[level] < levelSet.questions.length - 1) {
        submitPageQuestionIndices[level]++;
    } else if (action === 'prev' && submitPageQuestionIndices[level] > 0) {
        submitPageQuestionIndices[level]--;
    }
    
    updateSubmitQuestionDisplay(level);
}

function setupSubmitSampleNavListeners() {
    const content = document.getElementById('submit-step-content');
    content?.removeEventListener('click', handleSubmitSampleNavClick); // Prevent duplicates
    content?.addEventListener('click', handleSubmitSampleNavClick);
}

function renderSubmitSampleQuestionCard(levelSet: any): string {
    const currentIndex = submitPageQuestionIndices[levelSet.level];
    const totalQuestions = levelSet.questions.length;
    const currentQuestion = levelSet.questions[currentIndex];

    return `
        <div class="sample-level-card level-${levelSet.level}" id="submit-sample-level-card-${levelSet.level}">
            <header class="sample-card-header">
                <h3>${t(levelSet.titleKey)}</h3>
            </header>
            <div class="sample-question-content-wrapper">
                <div class="sample-question-display-area" id="submit-sample-question-display-level-${levelSet.level}">
                    ${renderSingleQuestionDetail(currentQuestion)}
                </div>
                <div class="sample-question-nav" id="submit-sample-nav-level-${levelSet.level}">
                     <span class="sample-question-counter" id="submit-sample-counter-level-${levelSet.level}">
                        ${t('histbench.samples.question_counter', { current: currentIndex + 1, total: totalQuestions })}
                    </span>
                    <div class="nav-buttons">
                        <button class="nav-btn prev-btn" data-level="${levelSet.level}" data-action="prev" ${currentIndex === 0 ? 'disabled' : ''}>${t('histbench.samples.prev_button')}</button>
                        <button class="nav-btn next-btn" data-level="${levelSet.level}" data-action="next" ${currentIndex >= totalQuestions - 1 ? 'disabled' : ''}>${t('histbench.samples.next_button')}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function changeStep(step: number) {
    if (step > 0 && step <= totalSteps) {
        currentStep = step;
        const stepContentContainer = document.getElementById('submit-step-content');
        const stepperContainer = document.querySelector('.stepper-container');
        const controlsContainer = document.querySelector('.submit-controls');
        
        if (stepContentContainer && stepperContainer && controlsContainer) {
            stepContentContainer.innerHTML = renderStepContent(currentStep);
            stepperContainer.innerHTML = renderStepper();
            controlsContainer.innerHTML = renderControls();
            
            if (currentStep === 2) {
                setupSubmitSampleNavListeners();
            } else if (currentStep === 3) {
                setupFormListeners();
            }
        }
    }
}

// Delegated event handler for stepper controls
function handleControlsClick(event: Event) {
    const target = event.target as HTMLElement;
    
    // Handle stepper clicks
    const stepElement = target.closest('.step.clickable');
    if (stepElement) {
        const stepNumber = parseInt(stepElement.getAttribute('data-step') || '0', 10);
        if (stepNumber > 0 && stepNumber <= totalSteps) {
            changeStep(stepNumber);
        }
        return;
    }
    
    // Handle button clicks (existing logic)
    const button = target.closest('button');
    if (!button) return;

    if (button.id === 'prev-step-btn') {
        changeStep(currentStep - 1);
    } else if (button.id === 'next-step-btn') {
        changeStep(currentStep + 1);
    }
    // The submit button is handled by the form's 'submit' event, not a click handler here.
}


function renderStepper(): string {
    let stepperHTML = '';
    for (let i = 1; i <= totalSteps; i++) {
        stepperHTML += `
            <div class="step ${currentStep === i ? 'active' : ''} clickable" data-step="${i}">
                <div class="step-number">${i}</div>
                <div class="step-label">${t(`submit.stepper.step${i}`)}</div>
            </div>
        `;
    }
    return stepperHTML;
}

function renderControls(): string {
    const prevHidden = currentStep === 1 ? 'hidden' : '';
    const nextHidden = currentStep === 3 ? 'style="display: none;"' : '';
    const submitHidden = currentStep !== 3 ? 'style="display: none;"' : '';

    return `
        <button id="prev-step-btn" class="btn btn-secondary ${prevHidden}">${t('submit.buttons.prev')}</button>
        <button id="next-step-btn" class="btn" ${nextHidden}>${t('submit.buttons.next')}</button>
        <button id="submit-form-btn" type="submit" form="submission-form" class="btn" ${submitHidden}>${t('submit.buttons.submit')}</button>
    `;
}

function renderStep1(): string {
    return `
        <h2>${t('submit.step1.guidelines.title')}</h2>
        <div class="guidelines-grid">
            <div class="guideline-card">
                <h4>${t('submit.step1.types.title')}</h4>
                <p>${t('submit.step1.types.em')}</p>
                <p>${t('submit.step1.types.mc')}</p>
            </div>
            <div class="guideline-card">
                <h4>${t('submit.step1.levels.title')}</h4>
                <ul>
                    <li>${t('submit.step1.levels.l1')}</li>
                    <li>${t('submit.step1.levels.l2')}</li>
                    <li>${t('submit.step1.levels.l3')}</li>
                </ul>
            </div>
            <div class="guideline-card">
                <h4>${t('submit.step1.dimensions.title')}</h4>
                <ul>
                    <li>${t('submit.step1.dimensions.bibliographic')}</li>
                    <li>${t('submit.step1.dimensions.source_id')}</li>
                    <li>${t('submit.step1.dimensions.source_proc')}</li>
                    <li>${t('submit.step1.dimensions.hist_analysis')}</li>
                    <li>${t('submit.step1.dimensions.interdisciplinary')}</li>
                </ul>
            </div>
        </div>
    `;
}

function renderStep2(): string {
    // Reset indices whenever step2 is rendered
    sampleDataByLevel.forEach(levelSet => {
        submitPageQuestionIndices[levelSet.level] = 0;
    });
    
    const sampleQuestionCardsHTML = sampleDataByLevel.map(levelSet => renderSubmitSampleQuestionCard(levelSet)).join('');

    return `
        <h2>${t('submit.step2.gallery_title')}</h2>
        <div class="sample-levels-container">
            ${sampleQuestionCardsHTML}
        </div>
    `;
}

function renderStep3(): string {
    return `
        <h2>${t('submit.step3.form.title')}</h2>
        <div id="submission-status-container"></div>
        <form id="submission-form" novalidate>
            <div class="form-group">
                <label for="difficulty">${t('submit.form.difficulty.label')}</label>
                <select id="difficulty" class="form-control" required>
                    <option value="1">${t('submit.form.difficulty.l1')}</option>
                    <option value="2">${t('submit.form.difficulty.l2')}</option>
                    <option value="3">${t('submit.form.difficulty.l3')}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="answerType">${t('submit.form.answer_type.label')}</label>
                <select id="answerType" class="form-control" required>
                    <option value="Exact Match">${t('submit.form.answer_type.em')}</option>
                    <option value="Multiple Choice">${t('submit.form.answer_type.mc')}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="questionText">${t('submit.form.question.label')}</label>
                <textarea id="questionText" class="form-control" rows="4" placeholder="${t('submit.form.question.placeholder')}" required></textarea>
            </div>
            <div class="form-group">
                <label for="requiredData">${t('submit.form.data.label')}</label>
                <textarea id="requiredData" class="form-control" rows="4" placeholder="${t('submit.form.data.placeholder')}" required></textarea>
                <div class="file-upload-group">
                    <label for="fileUpload" class="file-upload-label">${t('submit.form.data.upload_label')}</label>
                    <input type="file" id="fileUpload" accept="image/*,.pdf">
                    <span id="file-name-display"></span>
                </div>
            </div>
            <div class="form-group">
                <label for="answer">${t('submit.form.answer.label')}</label>
                <input type="text" id="answer" class="form-control" placeholder="${t('submit.form.answer.placeholder')}" required>
            </div>
            <div class="form-group">
                <label for="explanation">${t('submit.form.explanation.label')}</label>
                <textarea id="explanation" class="form-control" rows="4" placeholder="${t('submit.form.explanation.placeholder')}" required></textarea>
            </div>
             <div class="form-group">
                <label for="sourceReference">${t('submit.form.source.label')}</label>
                <textarea id="sourceReference" class="form-control" rows="2" placeholder="${t('submit.form.source.placeholder')}" required></textarea>
            </div>
            <div class="form-group">
                <label for="thematicDirection">${t('submit.form.thematic.label')}</label>
                <textarea id="thematicDirection" class="form-control" rows="2" placeholder="${t('submit.form.thematic.placeholder')}" required></textarea>
            </div>
            <div class="form-group">
                <label for="contributorName">${t('submit.form.name.label')}</label>
                <input type="text" id="contributorName" class="form-control" placeholder="${t('submit.form.name.placeholder')}" required>
            </div>
            <div class="form-group">
                <label for="contributorAffiliation">${t('submit.form.affiliation.label')}</label>
                <input type="text" id="contributorAffiliation" class="form-control" placeholder="${t('submit.form.affiliation.placeholder')}" required>
            </div>
            <div id="form-validation-error"></div>
        </form>
    `;
}


function renderStepContent(step: number): string {
    switch (step) {
        case 1: return renderStep1();
        case 2: return renderStep2();
        case 3: return renderStep3();
        default: return renderStep1();
    }
}

async function handleFormSubmit(event: Event) {
    event.preventDefault();
    const form = document.getElementById('submission-form') as HTMLFormElement;
    const errorContainer = document.getElementById('form-validation-error') as HTMLElement;
    const statusContainer = document.getElementById('submission-status-container') as HTMLElement;
    
    // Collect form data
    const formData: FormData = {
        difficulty: (document.getElementById('difficulty') as HTMLSelectElement).value,
        answerType: (document.getElementById('answerType') as HTMLSelectElement).value,
        questionText: (document.getElementById('questionText') as HTMLTextAreaElement).value,
        requiredData: (document.getElementById('requiredData') as HTMLTextAreaElement).value,
        answer: (document.getElementById('answer') as HTMLInputElement).value,
        explanation: (document.getElementById('explanation') as HTMLTextAreaElement).value,
        sourceReference: (document.getElementById('sourceReference') as HTMLTextAreaElement).value,
        thematicDirection: (document.getElementById('thematicDirection') as HTMLTextAreaElement).value,
        contributorName: (document.getElementById('contributorName') as HTMLInputElement).value,
        contributorAffiliation: (document.getElementById('contributorAffiliation') as HTMLInputElement).value,
        fileUpload: (document.getElementById('fileUpload') as HTMLInputElement).files?.[0]
    };

    // Validate form data using Firebase service
    const validation = validateSubmissionData(formData);
    if (!validation.isValid) {
        errorContainer.innerHTML = validation.errors.map(error => `<p>${error}</p>`).join('');
        errorContainer.style.display = 'block';
        return;
    }
    
    errorContainer.style.display = 'none';
    form.style.display = 'none';

    // Show loading spinner
    statusContainer.innerHTML = `
        <div id="submission-status" class="loading">
            <div class="spinner"></div>
            <p>${t('submit.messages.submitting_info')}</p>
        </div>
    `;

    try {
        // Submit data to Firebase Firestore
        const submissionResult = await submitToFirestore(formData);
        
        if (!submissionResult.success) {
            throw new Error(submissionResult.error || 'Failed to save submission');
        }

        console.log('Data submitted to Firebase with ID:', submissionResult.data);

        // Generate thank you message using Gemini AI
        const ai = new GoogleGenAI({apiKey: process.env.API_KEY as string});
        const prompt = "A user has successfully contributed a new question to HistBench. Please provide a warm and encouraging thank you message, confirming their submission has been received and will be reviewed by our team of historians. Mention that their contribution is valuable for advancing AI's understanding of history.";
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-preview-04-17',
          contents: prompt,
        });

        const successMessage = (response.text || '').replace(/\n/g, '<br>');

        statusContainer.innerHTML = `
            <div id="submission-status" class="success">
                <h3>${t('submit.messages.success_title')}</h3>
                <p>${successMessage}</p>
                <p><small>Submission ID: ${submissionResult.data}</small></p>
            </div>
        `;
    } catch (error) {
        console.error("Submission failed:", error);
        
        // Check if it's a Firebase error or Gemini error
        const isFirebaseError = error instanceof Error && (
            error.message.includes('Firestore') || 
            error.message.includes('permission-denied') ||
            error.message.includes('network-request-failed')
        );
        
        if (isFirebaseError) {
            statusContainer.innerHTML = `
                <div id="submission-status" class="error">
                    <h3>${t('submit.messages.error_title')}</h3>
                    <p>Failed to save your submission. Please check your internet connection and try again.</p>
                    <p><small>Error: ${error instanceof Error ? error.message : 'Unknown error'}</small></p>
                </div>
            `;
        } else {
            // Data was saved, but AI message generation failed
            statusContainer.innerHTML = `
                <div id="submission-status" class="success">
                    <h3>${t('submit.messages.success_title')}</h3>
                    <p>Your submission has been successfully saved and will be reviewed by our team of historians. Thank you for your contribution to advancing AI's understanding of history!</p>
                    <p><small>Note: AI message generation temporarily unavailable</small></p>
                </div>
            `;
        }
        
        if (isFirebaseError) {
            form.style.display = 'grid'; // Show form again only on Firebase error
        }
    } finally {
        const submitBtn = document.getElementById('submit-form-btn') as HTMLButtonElement;
        const prevBtn = document.getElementById('prev-step-btn') as HTMLButtonElement;
        if(submitBtn) submitBtn.style.display = 'none';
        if(prevBtn) prevBtn.style.display = 'none';
    }
}


function setupFormListeners() {
    const form = document.getElementById('submission-form');
    form?.addEventListener('submit', handleFormSubmit);

    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    const fileNameDisplay = document.getElementById('file-name-display');
    fileInput?.addEventListener('change', () => {
        if (fileInput.files && fileInput.files.length > 0 && fileNameDisplay) {
            fileNameDisplay.textContent = fileInput.files[0].name;
        } else if (fileNameDisplay) {
            fileNameDisplay.textContent = '';
        }
    });
}

export function renderSubmitPageContent(): string {
    // Reset step to 1 every time the page is fully rendered
    currentStep = 1;
    return `
        <div id="submit-page-container">
            <div class="container">
                <h1 class="text-center">${t('submit.page_title')}</h1>
                <section class="content-section text-center" style="background: none; border: none; box-shadow: none; padding-top: 0;">
                    <h2 style="font-size: 1.8rem; color: var(--primary-accent); border: none;">${t('submit.intro.title')}</h2>
                    <p><em>${t('submit.intro.p1')}</em></p>
                    <p>
                        ${t('submit.intro.p2')}<br>
                        ${t('submit.intro.p3')}<br>
                        ${t('submit.intro.p4')}<br>
                        ${t('submit.intro.p5')}
                    </p>
                    <p><strong>${t('submit.intro.join_us')}</strong></p>
                </section>

                <div class="stepper-container">${renderStepper()}</div>
                <div id="submit-step-content">${renderStepContent(currentStep)}</div>
                <div class="submit-controls">${renderControls()}</div>
            </div>
        </div>
    `;
}

export function setupSubmitPageListeners() {
    const container = document.getElementById('submit-page-container');
    container?.removeEventListener('click', handleControlsClick);
    container?.addEventListener('click', handleControlsClick);
    
    // Set up navigation listeners if we're on step 2
    if (currentStep === 2) {
        setupSubmitSampleNavListeners();
    }
    
    // The form itself is only present on step 3. 
    // The `changeStep` function calls `setupFormListeners` when it renders step 3,
    // which correctly attaches the listener to the newly created form.
    // This check handles the initial load. Since renderSubmitPageContent resets
    // the step to 1, this won't be called on initial page load, which is correct.
    if (currentStep === 3) {
        setupFormListeners();
    }
}