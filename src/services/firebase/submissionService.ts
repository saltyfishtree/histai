/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FormData, ApiResponse } from '../../types/types';

// Extended submission data with metadata
export interface SubmissionData extends FormData {
  id?: string;
  submittedAt?: Timestamp;
  status?: 'pending' | 'processed' | 'emailed';
  userAgent?: string;
  ipAddress?: string;
}

/**
 * Submit form data to Firestore
 * @param formData - The form data to submit
 * @returns Promise with submission result
 */
export async function submitToFirestore(formData: FormData): Promise<ApiResponse<string>> {
  try {
    // Validate required fields
    const requiredFields = ['difficulty', 'answerType', 'questionText', 'requiredData', 'answer', 'explanation', 'sourceReference', 'thematicDirection', 'contributorName', 'contributorAffiliation'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData] || String(formData[field as keyof FormData]).trim() === '') {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Prepare submission data with metadata
    const submissionData: SubmissionData = {
      ...formData,
      submittedAt: serverTimestamp() as Timestamp,
      status: 'pending',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
      // Note: IP address would be handled server-side for security
    };

    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'submissions'), submissionData);
    
    console.log('Submission successful with ID:', docRef.id);
    
    return {
      success: true,
      data: docRef.id
    };

  } catch (error) {
    console.error('Error submitting to Firestore:', error);
    
    // Handle specific Firebase errors
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        return {
          success: false,
          error: 'Permission denied. Please check your connection and try again.'
        };
      }
      
      if (error.message.includes('network-request-failed')) {
        return {
          success: false,
          error: 'Network error. Please check your internet connection.'
        };
      }
      
      if (error.message.includes('quota-exceeded')) {
        return {
          success: false,
          error: 'Service temporarily unavailable. Please try again later.'
        };
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}

/**
 * Validate form data before submission
 * @param formData - The form data to validate
 * @returns Validation result
 */
export function validateSubmissionData(formData: FormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required field validation
  if (!formData.difficulty || !['1', '2', '3'].includes(formData.difficulty)) {
    errors.push('Please select a valid difficulty level');
  }
  
  if (!formData.answerType || !['Exact Match', 'Multiple Choice'].includes(formData.answerType)) {
    errors.push('Please select a valid answer type');
  }
  
  if (!formData.questionText || formData.questionText.length < 10) {
    errors.push('Question text must be at least 10 characters long');
  }
  
  if (!formData.requiredData || formData.requiredData.length < 5) {
    errors.push('Required data description must be at least 5 characters long');
  }
  
  if (!formData.answer || formData.answer.length < 1) {
    errors.push('Answer is required');
  }
  
  if (!formData.explanation || formData.explanation.length < 20) {
    errors.push('Explanation must be at least 20 characters long');
  }
  
  if (!formData.sourceReference || formData.sourceReference.length < 5) {
    errors.push('Source reference is required');
  }
  
  if (!formData.thematicDirection || formData.thematicDirection.length < 5) {
    errors.push('Thematic direction is required');
  }
  
  if (!formData.contributorName || formData.contributorName.length < 2) {
    errors.push('Contributor name is required');
  }
  
  if (!formData.contributorAffiliation || formData.contributorAffiliation.length < 2) {
    errors.push('Contributor affiliation is required');
  }
  
  // Length validation
  if (formData.questionText && formData.questionText.length > 1000) {
    errors.push('Question text is too long (max 1000 characters)');
  }
  
  if (formData.explanation && formData.explanation.length > 2000) {
    errors.push('Explanation is too long (max 2000 characters)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 