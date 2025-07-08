/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { FormData, ApiResponse } from '../../types/types';

// Firebase Functions URL - 在生产环境中应该是实际的函数URL
const FUNCTIONS_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://us-central1-histagent.cloudfunctions.net' 
  : 'http://localhost:5001/histagent/us-central1';

// Extended submission data with metadata
export interface SubmissionData extends FormData {
  id?: string;
  submittedAt?: string;
  status?: 'pending' | 'approved' | 'rejected';
  userAgent?: string;
}

/**
 * Submit form data to Firebase Functions
 * @param formData - The form data to submit
 * @returns Promise with submission result
 */
export async function submitToFirestore(formData: FormData): Promise<ApiResponse<string>> {
  try {
    // Validate required fields
    const validation = validateSubmissionData(formData);
    if (!validation.isValid) {
      return {
        success: false,
        error: `Validation failed: ${validation.errors.join(', ')}`
      };
    }

    // Prepare submission data with metadata
    const submissionData: SubmissionData = {
      ...formData,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'
    };

    // Call Firebase Function
    const response = await fetch(`${FUNCTIONS_BASE_URL}/submitQuestion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionData),
      // 添加超时设置
      signal: AbortSignal.timeout(30000) // 30秒超时
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('Submission successful with ID:', result.data.submissionId);
      return {
        success: true,
        data: result.data.submissionId
      };
    } else {
      throw new Error(result.error || 'Submission failed');
    }

  } catch (error) {
    console.error('Error submitting to Firebase Functions:', error);
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        return {
          success: false,
          error: '请求超时，请检查网络连接后重试'
        };
      }
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error: '网络错误，请检查您的网络连接'
        };
      }
      
      if (error.message.includes('permission-denied') || error.message.includes('403')) {
        return {
          success: false,
          error: '权限不足，请稍后重试'
        };
      }
      
      if (error.message.includes('quota-exceeded') || error.message.includes('429')) {
        return {
          success: false,
          error: '服务暂时不可用，请稍后重试'
        };
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '提交失败，请重试'
    };
  }
}

/**
 * Get submission status from Firebase Functions
 * @param submissionId - The submission ID to check
 * @returns Promise with submission status
 */
export async function getSubmissionStatus(submissionId: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/getSubmissionStatus?id=${encodeURIComponent(submissionId)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(10000) // 10秒超时
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return {
        success: true,
        data: result.data
      };
    } else {
      throw new Error(result.error || 'Failed to get submission status');
    }

  } catch (error) {
    console.error('Error getting submission status:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get submission status'
    };
  }
}

/**
 * Get submission statistics from Firebase Functions
 * @returns Promise with submission statistics
 */
export async function getSubmissionStats(): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/getSubmissionStats`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(10000) // 10秒超时
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return {
        success: true,
        data: result.data
      };
    } else {
      throw new Error(result.error || 'Failed to get submission statistics');
    }

  } catch (error) {
    console.error('Error getting submission statistics:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get submission statistics'
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
    errors.push('请选择有效的难度级别');
  }
  
  if (!formData.answerType || !['Exact Match', 'Multiple Choice'].includes(formData.answerType)) {
    errors.push('请选择有效的答题类型');
  }
  
  if (!formData.questionText || formData.questionText.trim().length < 10) {
    errors.push('问题描述至少需要10个字符');
  }
  
  if (!formData.requiredData || formData.requiredData.trim().length < 10) {
    errors.push('所需数据描述至少需要10个字符');
  }
  
  if (!formData.answer || formData.answer.trim().length < 1) {
    errors.push('答案不能为空');
  }
  
  if (!formData.explanation || formData.explanation.trim().length < 20) {
    errors.push('解释说明至少需要20个字符');
  }
  
  if (!formData.sourceReference || formData.sourceReference.trim().length < 5) {
    errors.push('资料来源不能为空');
  }
  
  if (!formData.thematicDirection || formData.thematicDirection.trim().length < 5) {
    errors.push('主题方向不能为空');
  }
  
  if (!formData.contributorName || formData.contributorName.trim().length < 2) {
    errors.push('贡献者姓名不能为空');
  }
  
  if (!formData.contributorAffiliation || formData.contributorAffiliation.trim().length < 2) {
    errors.push('所属机构不能为空');
  }
  
  // Length validation
  if (formData.questionText && formData.questionText.length > 1000) {
    errors.push('问题描述过长（最多1000个字符）');
  }
  
  if (formData.explanation && formData.explanation.length > 2000) {
    errors.push('解释说明过长（最多2000个字符）');
  }
  
  if (formData.requiredData && formData.requiredData.length > 3000) {
    errors.push('所需数据描述过长（最多3000个字符）');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 