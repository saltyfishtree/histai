/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'about' | 'histbench' | 'authors' | 'submit';
export type Language = 'en' | 'zh';

// Generic key type for page titles or other page-specific translations
export type PageKey = Page | 'site';

// Form related types
export interface FormData {
  difficulty: string;
  answerType: string;
  questionText: string;
  requiredData: string;
  answer: string;
  explanation: string;
  sourceReference: string;
  thematicDirection: string;
  contributorName: string;
  contributorAffiliation: string;
  fileUpload?: File;
  // 文件上传后的信息（用于提交到后端）
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

// Sample question types
export interface SampleImageDetail {
  fileName: string;
  altKey: string;
  captionKey: string;
}

export interface SampleQuestionDetail {
  id: string;
  titleKey: string;
  difficultyDisplayKey: string;
  answerTypeKey: string;
  questionKey: string;
  dataKey: string;
  answerKey: string;
  explanationKey: string;
  sourceReferenceKey: string;
  options?: { [key: string]: string };
  correctAnswerKey?: string;
  images?: SampleImageDetail[];
}

export interface LevelSampleSet {
  level: number;
  titleKey: string;
  questions: SampleQuestionDetail[];
}

// API related types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Animation and motion types
export interface MotionVariant {
  initial?: any;
  animate?: any;
  exit?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  transition?: any;
  viewport?: any;
}

export interface MotionProps {
  initial?: any;
  animate?: any;
  exit?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  transition?: any;
  viewport?: any;
} 