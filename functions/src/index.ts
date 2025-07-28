import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { onSchedule, ScheduledEvent } from 'firebase-functions/v2/scheduler';
import { getDailySubmissions, sendDailyReport } from './emailService';

// 初始化Firebase Admin SDK 初始化之后才能创建DB等
admin.initializeApp();

// 获取Firestore数据库实例
// 在模拟器环境中，这会自动连接到本地Firestore模拟器
const db = admin.firestore();

// 在开发环境中设置模拟器连接
if (process.env.NODE_ENV !== 'production') {
  // 检查是否在模拟器环境中运行
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log('🔧 连接到Firestore模拟器:', process.env.FIRESTORE_EMULATOR_HOST);
  } else {
    console.log('⚠️ 警告: 未检测到Firestore模拟器环境变量');
  }
}

// 定义表单数据接口
interface SubmissionData {
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
  // 可选的文件字段
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

// 简单的健康检查函数
export const healthCheck = functions.https.onRequest((req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 提交问题数据的Cloud Function（Firestore版本）
export const submitQuestion = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    // 只允许POST请求
    if (req.method !== 'POST') {
      res.status(405).json({ 
        success: false, 
        error: '只允许POST请求' 
      });
      return;
    }

    // 获取提交的数据
    const submissionData: SubmissionData = req.body;

    // 基本验证
    if (!submissionData.questionText || !submissionData.answer || !submissionData.contributorName) {
      res.status(400).json({
        success: false,
        error: '缺少必填字段：questionText, answer, contributorName'
      });
      return;
    }

    // 生成唯一ID
    const submissionId = 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // 准备要保存的数据
    const questionData: any = {
      id: submissionId,
      // 问题基本信息
      difficulty: parseInt(submissionData.difficulty || '1'),
      answerType: submissionData.answerType || 'Exact Match',
      questionText: submissionData.questionText.trim(),
      requiredData: submissionData.requiredData?.trim() || '',
      answer: submissionData.answer.trim(),
      explanation: submissionData.explanation?.trim() || '',
      sourceReference: submissionData.sourceReference?.trim() || '',
      thematicDirection: submissionData.thematicDirection?.trim() || '',
      
      // 贡献者信息
      contributorName: submissionData.contributorName.trim(),
      contributorAffiliation: submissionData.contributorAffiliation?.trim() || '',
      
      // 元数据
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    // 只有当文件数据存在时才添加附件信息
    if (submissionData.fileUrl && submissionData.fileName) {
      questionData.attachments = {
        fileUrl: submissionData.fileUrl,
        fileName: submissionData.fileName,
        fileSize: submissionData.fileSize || 0,
        fileType: submissionData.fileType || 'unknown',
        uploadedAt: new Date().toISOString()
      };
      
      console.log('文件附件已添加:', submissionData.fileName);
    }

    // 保存到Firestore数据库
    await db.collection('submissions').doc(submissionId).set(questionData);

    console.log('新问题提交成功:', submissionId);

    // 返回成功响应
    res.status(200).json({
      success: true,
      data: {
        submissionId: submissionId,
        message: '问题提交成功，感谢您的贡献！'
      }
    });

  } catch (error) {
    console.error('问题提交失败:', error);
    
    res.status(500).json({
      success: false,
      error: '服务器内部错误，请稍后重试',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

// 获取提交状态的Cloud Function（Firestore版本）
export const getSubmissionStatus = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ 
        success: false, 
        error: '只允许GET请求' 
      });
      return;
    }

    const submissionId = req.query.id as string;
    
    if (!submissionId) {
      res.status(400).json({
        success: false,
        error: '缺少提交ID参数'
      });
      return;
    }


    // 从Firestore查找
    const doc = await db.collection('submissions').doc(submissionId).get();

    if (!doc.exists) {
      res.status(404).json({
        success: false,
        error: '未找到该提交记录'
      });
      return;
    }

    const submission = doc.data();
    
    // 只返回状态相关信息
    res.status(200).json({
      success: true,
      data: {
        submissionId: submission?.id,
        status: submission?.status,
        submittedAt: submission?.submittedAt,
        reviewNotes: submission?.reviewNotes || ''
      }
    });

  } catch (error) {
    console.error('获取提交状态失败:', error);
    
    res.status(500).json({
      success: false,
      error: '服务器内部错误',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

// 获取所有提交的统计信息（Firestore版本）
export const getSubmissionStats = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ 
        success: false, 
        error: '只允许GET请求' 
      });
      return;
    }

    // 从Firestore获取所有提交
    const snapshot = await db.collection('submissions').orderBy('submittedAt', 'desc').get();
    const submissions = snapshot.docs.map(doc => doc.data());

    // 统计数据
    const total = submissions.length;
    const pending = submissions.filter(item => item.status === 'pending').length;
    const approved = submissions.filter(item => item.status === 'approved').length;
    const rejected = submissions.filter(item => item.status === 'rejected').length;

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
        recentSubmissions: submissions.slice(0, 5) // 最近5个提交
      }
    });

  } catch (error) {
    console.error('获取统计信息失败:', error);
    
    res.status(500).json({
      success: false,
      error: '服务器内部错误',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

// 查看所有提交的详细数据（管理员功能，Firestore版本）
export const getAllSubmissions = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ 
        success: false, 
        error: '只允许GET请求' 
      });
      return;
    }

    // 获取查询参数
    const limit = parseInt(req.query.limit as string) || 50; // 默认限制50条
    const status = req.query.status as string;

    // 构建查询
    let query = db.collection('submissions').orderBy('submittedAt', 'desc');

    // 按状态过滤
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query = query.where('status', '==', status);
    }

    // 限制数量
    query = query.limit(limit);

    const snapshot = await query.get();
    const submissions = snapshot.docs.map(doc => doc.data());

    res.status(200).json({
      success: true,
      data: {
        submissions,
        pagination: {
          total: submissions.length,
          limit
        }
      }
    });

  } catch (error) {
    console.error('获取所有提交失败:', error);
    
    res.status(500).json({
      success: false,
      error: '服务器内部错误',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

// 简单的数据查看页面（HTML格式，Firestore版本）
export const viewSubmissions = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ 
        success: false, 
        error: '只允许GET请求' 
      });
      return;
    }

    // 从Firestore获取数据
    const snapshot = await db.collection('submissions').orderBy('submittedAt', 'desc').get();
    const submissions = snapshot.docs.map(doc => doc.data());

    // 生成HTML页面
    const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>提交数据查看</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .stats { display: flex; justify-content: space-around; margin-bottom: 20px; }
            .stat-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }
            .submission { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; background: #fafafa; }
            .submission-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
            .submission-id { font-weight: bold; color: #007bff; }
            .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .status.pending { background: #fff3cd; color: #856404; }
            .status.approved { background: #d4edda; color: #155724; }
            .status.rejected { background: #f8d7da; color: #721c24; }
            .field { margin: 8px 0; }
            .field-label { font-weight: bold; color: #555; }
            .field-value { margin-left: 10px; }
            .refresh-btn { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
            .refresh-btn:hover { background: #0056b3; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 提交数据查看 (Firestore版本)</h1>
                <button class="refresh-btn" onclick="location.reload()">🔄 刷新数据</button>
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <h3>总提交数</h3>
                    <div style="font-size: 24px; font-weight: bold; color: #007bff;">${submissions.length}</div>
                </div>
                <div class="stat-card">
                    <h3>待审核</h3>
                    <div style="font-size: 24px; font-weight: bold; color: #ffc107;">${submissions.filter(s => s.status === 'pending').length}</div>
                </div>
                <div class="stat-card">
                    <h3>已通过</h3>
                    <div style="font-size: 24px; font-weight: bold; color: #28a745;">${submissions.filter(s => s.status === 'approved').length}</div>
                </div>
                <div class="stat-card">
                    <h3>已拒绝</h3>
                    <div style="font-size: 24px; font-weight: bold; color: #dc3545;">${submissions.filter(s => s.status === 'rejected').length}</div>
                </div>
            </div>

            <div id="submissions">
                ${submissions.length === 0 ? '<p style="text-align: center; color: #666; font-size: 18px;">暂无提交数据</p>' : 
                  submissions.map(submission => `
                    <div class="submission">
                        <div class="submission-header">
                            <span class="submission-id">${submission.id}</span>
                            <span class="status ${submission.status}">${getStatusText(submission.status)}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">问题内容:</span>
                            <span class="field-value">${submission.questionText}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">答案:</span>
                            <span class="field-value">${submission.answer}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">难度级别:</span>
                            <span class="field-value">Level ${submission.difficulty}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">答题类型:</span>
                            <span class="field-value">${submission.answerType}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">主题方向:</span>
                            <span class="field-value">${submission.thematicDirection}</span>
                        </div>
                        <div class="field">
                            <span class="field-label">贡献者:</span>
                            <span class="field-value">${submission.contributorName} (${submission.contributorAffiliation})</span>
                        </div>
                        <div class="field">
                            <span class="field-label">提交时间:</span>
                            <span class="field-value">${new Date(submission.submittedAt).toLocaleString('zh-CN')}</span>
                        </div>
                        ${submission.explanation ? `
                        <div class="field">
                            <span class="field-label">解释说明:</span>
                            <span class="field-value">${submission.explanation}</span>
                        </div>` : ''}
                        ${submission.sourceReference ? `
                        <div class="field">
                            <span class="field-label">资料来源:</span>
                            <span class="field-value">${submission.sourceReference}</span>
                        </div>` : ''}
                        ${submission.requiredData ? `
                        <div class="field">
                            <span class="field-label">所需数据:</span>
                            <span class="field-value">${submission.requiredData}</span>
                        </div>` : ''}
                    </div>
                  `).join('')}
            </div>
        </div>
        
        <script>
            function getStatusText(status) {
                switch(status) {
                    case 'pending': return '待审核';
                    case 'approved': return '已通过';
                    case 'rejected': return '已拒绝';
                    default: return status;
                }
            }
        </script>
    </body>
    </html>
    `;

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);

  } catch (error) {
    console.error('生成查看页面失败:', error);
    
    res.status(500).json({
      success: false,
      error: '服务器内部错误',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

// 辅助函数
function getStatusText(status: string): string {
  switch(status) {
    case 'pending': return '待审核';
    case 'approved': return '已通过';
    case 'rejected': return '已拒绝';
    default: return status;
  }
}

// ==================== 邮件发送功能 ====================

// 每日定时发送邮件报告（每天8点执行）
export const dailyReportScheduler = onSchedule({
  schedule: '0 8 * * *',
  timeZone: 'Asia/Shanghai'
}, async (context: ScheduledEvent) => {
    try {
      console.log('🕐 开始执行每日邮件报告任务:', new Date().toLocaleString('zh-CN'));
      
      // 获取当天新增的提交数据
      const todaySubmissions = await getDailySubmissions();
      
      if (todaySubmissions.length === 0) {
        console.log('📭 今日无新增提交，跳过邮件发送');
        return;
      }
      
      // 发送邮件报告
      await sendDailyReport(todaySubmissions);
      
      console.log('✅ 每日邮件报告发送完成');
      
    } catch (error) {
      console.error('❌ 每日邮件报告发送失败:', error);
      
      // 记录错误但不抛出，避免影响其他任务
    }
  });

// 手动触发每日邮件报告（API）
export const sendDailyReportManually = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method !== 'POST') {
      res.status(405).json({ 
        success: false, 
        error: '只允许POST请求' 
      });
      return;
    }

    console.log('🔧 手动触发每日邮件报告');
    
    // 获取查询参数，支持指定日期
    const targetDate = req.body.date || new Date().toISOString().split('T')[0];
    console.log('📅 目标日期:', targetDate);
    
    // 获取指定日期的提交数据
    const submissions = await getDailySubmissions();
    
    if (submissions.length === 0) {
      res.status(200).json({
        success: true,
        message: '指定日期无新增提交，未发送邮件',
        data: {
          date: targetDate,
          submissionCount: 0
        }
      });
      return;
    }
    
    // 发送邮件报告
    await sendDailyReport(submissions);
    
    res.status(200).json({
      success: true,
      message: '邮件报告发送成功',
      data: {
        date: targetDate,
        submissionCount: submissions.length
      }
    });
    
  } catch (error) {
    console.error('手动发送邮件报告失败:', error);
    
    res.status(500).json({
      success: false,
      error: '发送邮件报告失败',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

// 获取邮件发送历史
export const getEmailHistory = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ 
        success: false, 
        error: '只允许GET请求' 
      });
      return;
    }

    const limit = parseInt(req.query.limit as string) || 30;
    
    const snapshot = await db.collection('emailHistory')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    
    const emailHistory = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.status(200).json({
      success: true,
      data: {
        history: emailHistory,
        total: emailHistory.length
      }
    });
    
  } catch (error) {
    console.error('获取邮件历史失败:', error);
    
    res.status(500).json({
      success: false,
      error: '获取邮件历史失败',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});

// 测试邮件发送功能
export const testEmailSending = functions.https.onRequest(async (req, res) => {
  // 设置CORS头
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    if (req.method !== 'POST') {
      res.status(405).json({ 
        success: false, 
        error: '只允许POST请求' 
      });
      return;
    }

    console.log('🧪 测试邮件发送功能');
    
    // 创建测试数据
    const testSubmissions = [
      {
        id: 'test_sub_' + Date.now(),
        difficulty: 2,
        answerType: 'Exact Match',
        questionText: '这是一个测试问题，用于验证邮件发送功能是否正常工作。',
        requiredData: '这是测试所需的数据描述。',
        answer: '这是测试问题的答案。',
        explanation: '这是对测试问题的详细解释说明。',
        sourceReference: '测试资料来源',
        thematicDirection: '测试主题方向',
        contributorName: '测试贡献者',
        contributorAffiliation: '测试机构',
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }
    ];
    
    // 发送测试邮件
    await sendDailyReport(testSubmissions);
    
    res.status(200).json({
      success: true,
      message: '测试邮件发送成功',
      data: {
        testSubmissionsCount: testSubmissions.length
      }
    });
    
  } catch (error) {
    console.error('测试邮件发送失败:', error);
    
    res.status(500).json({
      success: false,
      error: '测试邮件发送失败',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
});