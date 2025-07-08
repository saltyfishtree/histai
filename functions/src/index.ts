// Firebase Functions 2nd gen imports
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import * as admin from 'firebase-admin';

// Set global options for all functions
setGlobalOptions({ 
  region: 'us-central1',
  maxInstances: 10,
  concurrency: 80
});

// Initialize Firebase Admin
admin.initializeApp();

interface SubmissionData {
  id?: string;
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
  submittedAt: any;
  status: 'pending' | 'processed' | 'emailed';
  userAgent?: string;
}

/**
 * Core logic for processing submissions
 */
async function processSubmissions(): Promise<void> {
  const db = admin.firestore();
  
  try {
    // Get all pending submissions
    const submissionsRef = db.collection('submissions');
    const pendingQuery = submissionsRef
      .where('status', '==', 'pending')
      .orderBy('submittedAt', 'desc');
    
    const snapshot = await pendingQuery.get();
    
    if (snapshot.empty) {
      console.log('No pending submissions found');
      return;
    }

    const submissions: SubmissionData[] = [];
    const batch = db.batch();

    snapshot.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const data = doc.data() as SubmissionData;
      submissions.push({ ...data, id: doc.id });
      
      // Mark as processed
      batch.update(doc.ref, { 
        status: 'processed',
        processedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    // Generate email content
    const emailContent = generateEmailContent(submissions);
    
    // Send email using your preferred service
    // This is a placeholder - you would integrate with SendGrid, Mailgun, etc.
    await sendEmail('abc@gmail.com', 'New HistBench Submissions', emailContent);
    
    // Update statuses to 'emailed'
    submissions.forEach((submission) => {
      if (submission.id) {
        const docRef = db.collection('submissions').doc(submission.id);
        batch.update(docRef, { 
          status: 'emailed',
          emailedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    });

    await batch.commit();
    
    console.log(`Processed ${submissions.length} submissions`);
  } catch (error) {
    console.error('Error in processSubmissions:', error);
    throw error;
  }
}

/**
 * Scheduled function to aggregate submissions and send email digest
 * Runs daily at 6 AM UTC
 */
export const sendDailySubmissionDigest = onSchedule(
  {
    schedule: '0 6 * * *',
    timeZone: 'UTC',
    retryCount: 3,
    maxInstances: 1
  },
  async (event) => {
    try {
      console.log('Starting daily submission digest...');
      await processSubmissions();
      console.log('Daily submission digest completed successfully');
      return null;
    } catch (error) {
      console.error('Error in sendDailySubmissionDigest:', error);
      throw error;
    }
  }
);

/**
 * HTTP function to manually trigger email sending (for testing)
 */
export const triggerEmailDigest = onRequest(
  {
    cors: true,
    maxInstances: 5
  },
  async (req, res) => {
    try {
      console.log('Manual trigger of email digest started...');
      await processSubmissions();
      res.status(200).json({ 
        success: true, 
        message: 'Email digest triggered successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error triggering email digest:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to trigger email digest',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

/**
 * HTTP function to get submission statistics
 */
export const getStats = onRequest(
  {
    cors: true,
    maxInstances: 10
  },
  async (req, res) => {
    try {
      const db = admin.firestore();
      const submissionsRef = db.collection('submissions');
      
      // Get total count
      const totalSnapshot = await submissionsRef.count().get();
      const totalCount = totalSnapshot.data().count;
      
      // Get pending count
      const pendingSnapshot = await submissionsRef
        .where('status', '==', 'pending')
        .count()
        .get();
      const pendingCount = pendingSnapshot.data().count;
      
      // Get processed count
      const processedSnapshot = await submissionsRef
        .where('status', '==', 'processed')
        .count()
        .get();
      const processedCount = processedSnapshot.data().count;
      
      // Get emailed count
      const emailedSnapshot = await submissionsRef
        .where('status', '==', 'emailed')
        .count()
        .get();
      const emailedCount = emailedSnapshot.data().count;

      res.status(200).json({
        total: totalCount,
        pending: pendingCount,
        processed: processedCount,
        emailed: emailedCount,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(500).json({ 
        error: 'Failed to get statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

/**
 * HTTP function to get submissions with pagination
 */
export const getSubmissions = onRequest(
  {
    cors: true,
    maxInstances: 10
  },
  async (req, res) => {
    try {
      const db = admin.firestore();
      const submissionsRef = db.collection('submissions');
      
      // Parse query parameters
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
      const status = req.query.status as string;
      const startAfter = req.query.startAfter as string;
      
      let query = submissionsRef.orderBy('submittedAt', 'desc');
      
      if (status && ['pending', 'processed', 'emailed'].includes(status)) {
        query = submissionsRef
          .where('status', '==', status)
          .orderBy('submittedAt', 'desc');
      }
      
      if (startAfter) {
        const startAfterDoc = await submissionsRef.doc(startAfter).get();
        if (startAfterDoc.exists) {
          query = query.startAfter(startAfterDoc);
        }
      }
      
      const snapshot = await query.limit(limit).get();
      
      const submissions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      res.status(200).json({
        submissions,
        hasMore: snapshot.docs.length === limit,
        lastId: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null
      });
    } catch (error) {
      console.error('Error getting submissions:', error);
      res.status(500).json({ 
        error: 'Failed to get submissions',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

/**
 * HTTP function to search submissions
 */
export const searchSubmissions = onRequest(
  {
    cors: true,
    maxInstances: 10
  },
  async (req, res) => {
    try {
      const db = admin.firestore();
      const submissionsRef = db.collection('submissions');
      
      const searchTerm = req.query.q as string;
      const difficulty = req.query.difficulty as string;
      const answerType = req.query.answerType as string;
      
      if (!searchTerm && !difficulty && !answerType) {
        return res.status(400).json({ error: 'At least one search parameter is required' });
      }
      
      let query = submissionsRef.orderBy('submittedAt', 'desc');
      
      if (difficulty) {
        query = submissionsRef
          .where('difficulty', '==', difficulty)
          .orderBy('submittedAt', 'desc');
      }
      
      if (answerType) {
        query = query.where('answerType', '==', answerType);
      }
      
      const snapshot = await query.limit(50).get();
      
      let submissions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Client-side filtering for text search (Firestore doesn't support full-text search)
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        submissions = submissions.filter((submission: any) => {
          return submission.questionText?.toLowerCase().includes(searchLower) ||
                 submission.answer?.toLowerCase().includes(searchLower) ||
                 submission.explanation?.toLowerCase().includes(searchLower) ||
                 submission.contributorName?.toLowerCase().includes(searchLower);
        });
      }
      
      res.status(200).json({
        submissions,
        count: submissions.length,
        searchTerm,
        filters: { difficulty, answerType }
      });
    } catch (error) {
      console.error('Error searching submissions:', error);
      res.status(500).json({ 
        error: 'Failed to search submissions',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

/**
 * HTTP callable function to submit a contribution
 */
export const submitContribution = onRequest(
  {
    cors: true,
    maxInstances: 20
  },
  async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      
      const submissionData = req.body as Omit<SubmissionData, 'id' | 'submittedAt' | 'status'>;
      
      // Validate required fields
      const requiredFields = [
        'difficulty', 'answerType', 'questionText', 
        'requiredData', 'answer', 'explanation', 
        'sourceReference', 'thematicDirection', 
        'contributorName', 'contributorAffiliation'
      ];
      
      for (const field of requiredFields) {
        if (!submissionData[field as keyof typeof submissionData]) {
          return res.status(400).json({ error: `Missing required field: ${field}` });
        }
      }
      
      const db = admin.firestore();
      const submissionWithMetadata: SubmissionData = {
        ...submissionData,
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'pending',
        userAgent: req.headers['user-agent'] || 'Unknown'
      };
      
      const docRef = await db.collection('submissions').add(submissionWithMetadata);
      
      res.status(201).json({
        success: true,
        id: docRef.id,
        message: 'Contribution submitted successfully'
      });
    } catch (error) {
      console.error('Error submitting contribution:', error);
      res.status(500).json({ 
        error: 'Failed to submit contribution',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
);

/**
 * Simple health check function
 */
export const healthCheck = onRequest(
  {
    cors: true
  },
  async (req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '2.0.0'
    });
  }
);

/**
 * Generate HTML email content from submissions
 */
function generateEmailContent(submissions: SubmissionData[]): string {
  const submissionCount = submissions.length;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
          .submission { border: 1px solid #ddd; margin: 20px 0; padding: 15px; border-radius: 5px; }
          .field { margin: 10px 0; }
          .label { font-weight: bold; color: #8B4513; }
          .difficulty-1 { border-left: 4px solid #28a745; }
          .difficulty-2 { border-left: 4px solid #ffc107; }
          .difficulty-3 { border-left: 4px solid #dc3545; }
          .summary { background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>HistBench Submissions Report</h1>
          <p>${currentDate}</p>
        </div>
        
        <div class="summary">
          <h2>Summary</h2>
          <p><strong>${submissionCount}</strong> new submissions received</p>
          <ul>
            <li>Level 1 (Basic): ${submissions.filter(s => s.difficulty === '1').length}</li>
            <li>Level 2 (Intermediate): ${submissions.filter(s => s.difficulty === '2').length}</li>
            <li>Level 3 (Advanced): ${submissions.filter(s => s.difficulty === '3').length}</li>
          </ul>
          <ul>
            <li>Exact Match: ${submissions.filter(s => s.answerType === 'Exact Match').length}</li>
            <li>Multiple Choice: ${submissions.filter(s => s.answerType === 'Multiple Choice').length}</li>
          </ul>
        </div>
  `;

  submissions.forEach((submission, index) => {
    const submittedDate = submission.submittedAt?.toDate ? 
      new Date(submission.submittedAt.toDate()).toLocaleString() : 
      'Unknown';
      
    html += `
      <div class="submission difficulty-${submission.difficulty}">
        <h3>Submission ${index + 1}</h3>
        <div class="field">
          <span class="label">Difficulty:</span> Level ${submission.difficulty}
        </div>
        <div class="field">
          <span class="label">Answer Type:</span> ${submission.answerType}
        </div>
        <div class="field">
          <span class="label">Question:</span><br>
          ${submission.questionText}
        </div>
        <div class="field">
          <span class="label">Required Data:</span><br>
          ${submission.requiredData}
        </div>
        <div class="field">
          <span class="label">Answer:</span> ${submission.answer}
        </div>
        <div class="field">
          <span class="label">Explanation:</span><br>
          ${submission.explanation}
        </div>
        <div class="field">
          <span class="label">Source Reference:</span><br>
          ${submission.sourceReference}
        </div>
        <div class="field">
          <span class="label">Thematic Direction:</span><br>
          ${submission.thematicDirection}
        </div>
        <div class="field">
          <span class="label">Contributor:</span> ${submission.contributorName} (${submission.contributorAffiliation})
        </div>
        <div class="field">
          <span class="label">Submitted:</span> ${submittedDate}
        </div>
      </div>
    `;
  });

  html += `
      </body>
    </html>
  `;

  return html;
}

/**
 * Send email using your preferred service
 * This is a placeholder implementation
 */
async function sendEmail(to: string, subject: string, htmlContent: string): Promise<void> {
  // Placeholder for email sending logic
  // You would integrate with SendGrid, Mailgun, or similar service here
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content length: ${htmlContent.length} characters`);
  
  // Example with SendGrid (you would need to install @sendgrid/mail):
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: to,
    from: 'noreply@histai.com',
    subject: subject,
    html: htmlContent,
  };
  
  await sgMail.send(msg);
  */
} 