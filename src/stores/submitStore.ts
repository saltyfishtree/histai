/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { create } from 'zustand';
import { FormData } from '../types/types';

interface SubmitState {
  currentStep: number;
  totalSteps: number;
  formData: Partial<FormData>;
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
  submissionMessage: string;
  questionIndices: Record<number, number>;
  validationErrors: Record<string, string>;
  
  // Actions
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  setSubmissionStatus: (status: 'idle' | 'submitting' | 'success' | 'error') => void;
  setSubmissionMessage: (message: string) => void;
  updateQuestionIndex: (level: number, index: number) => void;
  setValidationErrors: (errors: Record<string, string>) => void;
  clearValidationErrors: () => void;
}

export const useSubmitStore = create<SubmitState>((set, get) => ({
  currentStep: 1,
  totalSteps: 3,
  formData: {},
  submissionStatus: 'idle',
  submissionMessage: '',
  questionIndices: { 1: 0, 2: 0, 3: 0 },
  validationErrors: {},

  nextStep: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  setStep: (step: number) => {
    const { totalSteps } = get();
    if (step >= 1 && step <= totalSteps) {
      set({ currentStep: step });
    }
  },

  updateFormData: (data: Partial<FormData>) => {
    set(state => ({
      formData: { ...state.formData, ...data }
    }));
  },

  resetForm: () => {
    set({
      currentStep: 1,
      formData: {},
      submissionStatus: 'idle',
      submissionMessage: '',
      questionIndices: { 1: 0, 2: 0, 3: 0 },
      validationErrors: {}
    });
  },

  setSubmissionStatus: (status: 'idle' | 'submitting' | 'success' | 'error') => {
    set({ submissionStatus: status });
  },

  setSubmissionMessage: (message: string) => {
    set({ submissionMessage: message });
  },

  updateQuestionIndex: (level: number, index: number) => {
    set(state => ({
      questionIndices: {
        ...state.questionIndices,
        [level]: index
      }
    }));
  },

  setValidationErrors: (errors: Record<string, string>) => {
    set({ validationErrors: errors });
  },

  clearValidationErrors: () => {
    set({ validationErrors: {} });
  }
})); 