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

// 初始化Brevo事务性邮件客户端
function initBrevoTransactionalClient(): any {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  var apiKey = defaultClient.authentications['api-key'];
  
  // 从环境变量获取API密钥
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    throw new Error('BREVO_API_KEY environment variable is not set');
  }
  
  apiKey.apiKey = brevoApiKey;
  return new (SibApiV3Sdk as any).TransactionalEmailsApi();
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

// 生成简单文本格式邮件内容
function generateSimpleTextContent(submissions: any[]): string {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // 统计信息
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  // 生成简单文本内容
  let textContent = `HistAI每日提交报告 - ${dateStr}\n\n`;
  textContent += `统计概要: 新增${stats.total}条, 待审核${stats.pending}条, 已通过${stats.approved}条, 已拒绝${stats.rejected}条\n\n`;
  textContent += `提交详情:\n`;
  textContent += `${'='.repeat(50)}\n\n`;
  
  submissions.forEach((submission, index) => {
    textContent += `${index + 1}. ID: ${submission.id}\n`;
    textContent += `   时间: ${new Date(submission.submittedAt).toLocaleString('zh-CN')}\n`;
    textContent += `   状态: ${getStatusText(submission.status)}\n`;
    textContent += `   难度: Level ${submission.difficulty} | 类型: ${submission.answerType}\n`;
    textContent += `   问题: ${submission.questionText}\n`;
    textContent += `   答案: ${submission.answer}\n`;
    if (submission.explanation) textContent += `   解释: ${submission.explanation}\n`;
    if (submission.sourceReference) textContent += `   来源: ${submission.sourceReference}\n`;
    if (submission.thematicDirection) textContent += `   主题: ${submission.thematicDirection}\n`;
    textContent += `   贡献者: ${submission.contributorName}`;
    if (submission.contributorAffiliation) textContent += ` (${submission.contributorAffiliation})`;
    textContent += `\n`;
    if (submission.attachments) textContent += `   附件: ${submission.attachments.fileName} (${formatFileSize(submission.attachments.fileSize)})\n`;
    textContent += `\n${'-'.repeat(30)}\n\n`;
  });
  
  textContent += `此邮件由 HistAI 系统自动发送于 ${new Date().toLocaleString('zh-CN')}`;
  
  return textContent;
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

    // 生成简单的文本邮件内容
    const textContent = generateSimpleTextContent(submissions);
    
    // 从环境变量获取收件人列表
    const recipientsEnv = process.env.DAILY_REPORT_RECIPIENTS;
    const recipients = recipientsEnv ? recipientsEnv.split(',').map(email => email.trim()) : EMAIL_CONFIG.defaultRecipients;
    
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    // 使用事务性邮件API发送邮件
    const apiInstance = initBrevoTransactionalClient();
    const sendSmtpEmail = new (SibApiV3Sdk as any).SendSmtpEmail();
    
    // 配置事务性邮件
    sendSmtpEmail.subject = `${EMAIL_CONFIG.subject} - ${dateStr}（共${submissions.length}条新增）`;
    sendSmtpEmail.sender = {
      "name": process.env.DAILY_REPORT_SENDER_NAME || EMAIL_CONFIG.fromName,
      "email": process.env.DAILY_REPORT_SENDER_EMAIL || EMAIL_CONFIG.fromEmail
    };
    
    // 使用简单格式的HTML内容（保持文本的换行格式）
    sendSmtpEmail.htmlContent = `<pre style="font-family: monospace; white-space: pre-wrap; font-size: 14px;">${textContent}</pre>`;
    
    // 设置收件人列表
    sendSmtpEmail.to = recipients.map(email => ({ email: email }));

    console.log('准备发送事务性邮件:', {
      subject: sendSmtpEmail.subject,
      recipients: recipients,
      submissionsCount: submissions.length,
      contentLength: textContent.length,
      to: sendSmtpEmail.to
    });

    // 调用 Brevo 事务性邮件API
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
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