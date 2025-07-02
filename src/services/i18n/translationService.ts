/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Language } from '../../types/types';

type TranslationKey = string;

interface TranslationService {
  t(key: TranslationKey, params?: Record<string, string | number>): string;
  getCurrentLanguage(): Language;
  setLanguage(lang: Language): void;
}

// This will be used to wrap the original translation function
export function createTranslationService(
  originalT: (key: string, params?: Record<string, string | number>) => string,
  getCurrentLanguage: () => Language,
  setLanguage: (lang: Language) => void
): TranslationService {
  return {
    t: originalT,
    getCurrentLanguage,
    setLanguage
  };
} 