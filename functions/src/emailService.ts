/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import * as admin from 'firebase-admin';

// 邮件发送配置
const EMAIL_CONFIG = {
  fromName: 'HistAI Team',
  fromEmail: 'noreply@histai.com', // 需要配置实际的发件人邮箱
  subject: 'HistAI每日提交报告',
  // 默认收件人列表，可以通过环境变量配置
  defaultRecipients: ['admin@histai.com'] // 需要配置实际的收件人邮箱
};

// 动态获取Firestore实例的辅助函数
function getFirestore() {
  return admin.firestore();
}

// 初始化Brevo API客户端
function initBrevoClient(): SibApiV3Sdk.EmailCampaignsApi {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  
  // 从环境变量获取API密钥
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    throw new Error('BREVO_API_KEY environment variable is not set');
  }
  
  apiKey.apiKey = brevoApiKey;
  return new SibApiV3Sdk.EmailCampaignsApi();
}

// 获取当天新增的提交数据
export async function getDailySubmissions(): Promise<any[]> {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    console.log('查询日期范围:', {
      start: startOfDay.toISOString(),
      end: endOfDay.toISOString()
    });

    const snapshot = await getFirestore().collection('submissions')
      .where('submittedAt', '>=', startOfDay.toISOString())
      .where('submittedAt', '<', endOfDay.toISOString())
      .orderBy('submittedAt', 'desc')
      .get();

    const submissions = snapshot.docs.map((doc: any) => doc.data());
    console.log(`找到 ${submissions.length} 条今日新增提交`);
    
    return submissions;
  } catch (error) {
    console.error('获取当天提交数据失败:', error);
    throw error;
  }
}

// 生成邮件HTML内容
function generateEmailContent(submissions: any[]): string {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // 统计信息
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  // 生成邮件内容
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HistAI每日提交报告</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e9ecef;
            }
            .header h1 {
                color: #2c3e50;
                margin: 0;
                font-size: 28px;
            }
            .header .date {
                color: #7f8c8d;
                font-size: 16px;
                margin-top: 5px;
            }
            .stats {
                display: flex;
                justify-content: space-around;
                margin-bottom: 30px;
                padding: 20px;
                background-color: #f8f9fa;
                border-radius: 6px;
            }
            .stat-item {
                text-align: center;
                flex: 1;
            }
            .stat-number {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .stat-label {
                color: #6c757d;
                font-size: 12px;
            }
            .stat-total { color: #007bff; }
            .stat-pending { color: #ffc107; }
            .stat-approved { color: #28a745; }
            .stat-rejected { color: #dc3545; }
            .submission {
                border: 1px solid #e9ecef;
                border-radius: 6px;
                margin-bottom: 20px;
                padding: 20px;
                background-color: #ffffff;
            }
            .submission-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e9ecef;
            }
            .submission-id {
                font-family: monospace;
                font-size: 12px;
                color: #6c757d;
                background-color: #f8f9fa;
                padding: 4px 8px;
                border-radius: 4px;
            }
            .status {
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }
            .status.pending { background-color: #fff3cd; color: #856404; }
            .status.approved { background-color: #d4edda; color: #155724; }
            .status.rejected { background-color: #f8d7da; color: #721c24; }
            .field {
                margin-bottom: 12px;
            }
            .field-label {
                font-weight: 600;
                color: #495057;
                margin-bottom: 4px;
                display: block;
            }
            .field-value {
                color: #212529;
                padding: 8px 12px;
                background-color: #f8f9fa;
                border-radius: 4px;
                word-wrap: break-word;
            }
            .field-value.long {
                max-height: 100px;
                overflow-y: auto;
            }
            .contributor {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .contributor-name {
                font-weight: 600;
                color: #007bff;
            }
            .contributor-affiliation {
                color: #6c757d;
                font-size: 14px;
            }
            .attachment {
                background-color: #e3f2fd;
                border-left: 4px solid #2196f3;
                padding: 8px 12px;
                margin-top: 8px;
            }
            .attachment-name {
                font-weight: 600;
                color: #1976d2;
            }
            .attachment-size {
                color: #666;
                font-size: 12px;
            }
            .separator {
                border: none;
                height: 2px;
                background: linear-gradient(to right, #e9ecef, #dee2e6, #e9ecef);
                margin: 30px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e9ecef;
                color: #6c757d;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 HistAI每日提交报告</h1>
                <div class="date">${dateStr}（共${stats.total}条新增）</div>
            </div>
            
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number stat-total">${stats.total}</div>
                    <div class="stat-label">新增提交</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number stat-pending">${stats.pending}</div>
                    <div class="stat-label">待审核</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number stat-approved">${stats.approved}</div>
                    <div class="stat-label">已通过</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number stat-rejected">${stats.rejected}</div>
                    <div class="stat-label">已拒绝</div>
                </div>
            </div>
            
            <h2 style="color: #2c3e50; margin-bottom: 20px;">📝 所有新增提交详情</h2>
            
            ${submissions.map((submission, index) => `
                <div class="submission">
                    <div class="submission-header">
                        <span class="submission-id">${submission.id}</span>
                        <span class="status ${submission.status}">${getStatusText(submission.status)}</span>
                    </div>
                    
                    <div class="field">
                        <label class="field-label">提交时间</label>
                        <div class="field-value">${new Date(submission.submittedAt).toLocaleString('zh-CN')}</div>
                    </div>
                    
                    <div class="field">
                        <label class="field-label">问题内容</label>
                        <div class="field-value">${submission.questionText}</div>
                    </div>
                    
                    <div class="field">
                        <label class="field-label">答案</label>
                        <div class="field-value">${submission.answer}</div>
                    </div>
                    
                    <div class="field">
                        <label class="field-label">基本信息</label>
                        <div class="field-value">
                            <strong>难度级别:</strong> Level ${submission.difficulty} &nbsp;|&nbsp; 
                            <strong>答题类型:</strong> ${submission.answerType}
                        </div>
                    </div>
                    
                    ${submission.requiredData ? `
                    <div class="field">
                        <label class="field-label">所需数据</label>
                        <div class="field-value long">${submission.requiredData}</div>
                    </div>
                    ` : ''}
                    
                    ${submission.explanation ? `
                    <div class="field">
                        <label class="field-label">解释说明</label>
                        <div class="field-value long">${submission.explanation}</div>
                    </div>
                    ` : ''}
                    
                    ${submission.sourceReference ? `
                    <div class="field">
                        <label class="field-label">资料来源</label>
                        <div class="field-value">${submission.sourceReference}</div>
                    </div>
                    ` : ''}
                    
                    ${submission.thematicDirection ? `
                    <div class="field">
                        <label class="field-label">主题方向</label>
                        <div class="field-value">${submission.thematicDirection}</div>
                    </div>
                    ` : ''}
                    
                    <div class="field">
                        <label class="field-label">贡献者</label>
                        <div class="field-value">
                            <div class="contributor">
                                <span class="contributor-name">${submission.contributorName}</span>
                                ${submission.contributorAffiliation ? `
                                    <span class="contributor-affiliation">(${submission.contributorAffiliation})</span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    ${submission.attachments ? `
                    <div class="field">
                        <label class="field-label">附件</label>
                        <div class="attachment">
                            <div class="attachment-name">📎 ${submission.attachments.fileName}</div>
                            <div class="attachment-size">${formatFileSize(submission.attachments.fileSize)} - ${submission.attachments.fileType}</div>
                        </div>
                    </div>
                    ` : ''}
                </div>
                ${index < submissions.length - 1 ? '<hr class="separator">' : ''}
            `).join('')}
            
            <div class="footer">
                <p>🔗 <a href="http://127.0.0.1:5003/test/us-central1/viewSubmissions">在线查看详情</a></p>
                <p>📧 如有问题请回复此邮件</p>
                <p><small>此邮件由 HistAI 系统自动发送于 ${new Date().toLocaleString('zh-CN')}</small></p>
            </div>
        </div>
    </body>
    </html>
  `;

  return htmlContent;
}

// 辅助函数：获取状态文本
function getStatusText(status: string): string {
  switch(status) {
    case 'pending': return '待审核';
    case 'approved': return '已通过';
    case 'rejected': return '已拒绝';
    default: return status;
  }
}

// 辅助函数：格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 发送每日报告邮件
export async function sendDailyReport(submissions: any[]): Promise<void> {
  try {
    if (submissions.length === 0) {
      console.log('没有新增提交，跳过邮件发送');
      return;
    }

    const apiInstance = initBrevoClient();
    const htmlContent = generateEmailContent(submissions);
    
    // 从环境变量获取收件人列表
    const recipientsEnv = process.env.DAILY_REPORT_RECIPIENTS;
    const recipients = recipientsEnv ? recipientsEnv.split(',').map(email => email.trim()) : EMAIL_CONFIG.defaultRecipients;
    
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    const emailCampaign = new SibApiV3Sdk.CreateEmailCampaign();
    emailCampaign.name = `HistAI每日报告-${dateStr}`;
    emailCampaign.subject = `${EMAIL_CONFIG.subject} - ${dateStr}（共${submissions.length}条新增）`;
    emailCampaign.sender = {
      name: process.env.DAILY_REPORT_SENDER_NAME || EMAIL_CONFIG.fromName,
      email: process.env.DAILY_REPORT_SENDER_EMAIL || EMAIL_CONFIG.fromEmail
    };
    emailCampaign.type = 'classic';
    emailCampaign.htmlContent = htmlContent;
    emailCampaign.recipients = {
      listIds: [], // 可以配置收件人列表ID
      // 或者直接指定收件人邮箱
    };
    
    // 立即发送
    emailCampaign.scheduledAt = new Date().toISOString();

    console.log('准备发送邮件:', {
      subject: emailCampaign.subject,
      recipients: recipients,
      submissionsCount: submissions.length
    });

    const result = await apiInstance.createEmailCampaign(emailCampaign);
    
    console.log('✅ 邮件发送成功:', result);
    
    // 记录发送历史
    await recordEmailSent(submissions.length, recipients, 'success');
    
  } catch (error) {
    console.error('❌ 邮件发送失败:', error);
    
    // 记录发送失败
    await recordEmailSent(submissions.length, [], 'failed', error);
    
    throw error;
  }
}

// 记录邮件发送历史
async function recordEmailSent(submissionCount: number, recipients: string[], status: 'success' | 'failed' | 'skipped', error?: any): Promise<void> {
  try {
    const record = {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      submissionCount,
      recipients,
      status,
      error: error ? (error.message || String(error)) : null
    };

    await getFirestore().collection('emailHistory').add(record);
    console.log('📧 邮件发送历史已记录:', record);
  } catch (historyError) {
    console.error('记录邮件历史失败:', historyError);
    // 不抛出错误，避免影响主流程
  }
} 