"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSubmissions = exports.healthCheck = exports.getStats = exports.submitContribution = exports.getSubmissions = exports.triggerEmailDigest = exports.sendDailySubmissionDigest = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// import { getDocs, collection, query, where, updateDoc, doc, orderBy, limit } from 'firebase/firestore';
// Initialize Firebase Admin
admin.initializeApp();
/**
 * Core logic for processing submissions
 */
async function processSubmissions() {
    const db = admin.firestore();
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
    const submissions = [];
    const batch = db.batch();
    snapshot.forEach((doc) => {
        const data = doc.data();
        submissions.push(Object.assign(Object.assign({}, data), { id: doc.id }));
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
}
/**
 * Scheduled function to aggregate submissions and send email digest
 * Runs daily at 6 AM UTC
 */
exports.sendDailySubmissionDigest = functions.pubsub
    .schedule('0 6 * * *')
    .timeZone('UTC')
    .onRun(async (context) => {
    try {
        await processSubmissions();
        return null;
    }
    catch (error) {
        console.error('Error in sendDailySubmissionDigest:', error);
        throw new functions.https.HttpsError('internal', 'Failed to process submissions');
    }
});
/**
 * Generate HTML email content from submissions
 */
function generateEmailContent(submissions) {
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
          <span class="label">Submitted:</span> ${new Date(submission.submittedAt.toDate()).toLocaleString()}
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
async function sendEmail(to, subject, htmlContent) {
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
/**
 * HTTP function to manually trigger email sending (for testing)
 */
exports.triggerEmailDigest = functions.https.onRequest(async (req, res) => {
    try {
        await processSubmissions();
        res.status(200).send('Email digest triggered successfully');
    }
    catch (error) {
        console.error('Error triggering email digest:', error);
        res.status(500).send('Failed to trigger email digest');
    }
});
// =============================================================================
// HTTP API ENDPOINTS
// =============================================================================
/**
 * Get all submissions with pagination
 */
exports.getSubmissions = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).send('');
        return;
    }
    try {
        const db = admin.firestore();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        let query = db.collection('submissions').orderBy('submittedAt', 'desc');
        if (status) {
            query = query.where('status', '==', status);
        }
        const snapshot = await query.limit(limit).offset((page - 1) * limit).get();
        const submissions = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.json({
            success: true,
            data: submissions,
            pagination: {
                page,
                limit,
                total: snapshot.size
            }
        });
    }
    catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
/**
 * Submit a new question/contribution
 */
exports.submitContribution = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).send('');
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, error: 'Method not allowed' });
        return;
    }
    try {
        const db = admin.firestore();
        const submission = Object.assign(Object.assign({}, req.body), { submittedAt: admin.firestore.FieldValue.serverTimestamp(), status: 'pending', userAgent: req.get('User-Agent') || 'unknown' });
        // Validate required fields
        const requiredFields = ['difficulty', 'answerType', 'questionText', 'answer', 'contributorName'];
        for (const field of requiredFields) {
            if (!submission[field]) {
                res.status(400).json({ success: false, error: `Missing required field: ${field}` });
                return;
            }
        }
        const docRef = await db.collection('submissions').add(submission);
        res.json({
            success: true,
            message: 'Contribution submitted successfully',
            submissionId: docRef.id
        });
    }
    catch (error) {
        console.error('Error submitting contribution:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
/**
 * Get submission statistics
 */
exports.getStats = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).send('');
        return;
    }
    try {
        const db = admin.firestore();
        const snapshot = await db.collection('submissions').get();
        const stats = {
            total: snapshot.size,
            byDifficulty: { '1': 0, '2': 0, '3': 0 },
            byStatus: { pending: 0, processed: 0, emailed: 0 },
            byAnswerType: { 'Exact Match': 0, 'Multiple Choice': 0 }
        };
        snapshot.forEach(doc => {
            const data = doc.data();
            stats.byDifficulty[data.difficulty]++;
            stats.byStatus[data.status]++;
            stats.byAnswerType[data.answerType]++;
        });
        res.json({
            success: true,
            data: stats
        });
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
/**
 * Health check endpoint
 */
exports.healthCheck = functions.https.onRequest(async (req, res) => {
    res.json({
        success: true,
        message: 'HistAI API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
/**
 * Search submissions
 */
exports.searchSubmissions = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).send('');
        return;
    }
    try {
        const db = admin.firestore();
        const query = req.query.q;
        if (!query) {
            res.status(400).json({ success: false, error: 'Search query is required' });
            return;
        }
        // Simple text search in question text and explanation
        const snapshot = await db.collection('submissions').get();
        const results = snapshot.docs
            .map(doc => (Object.assign({ id: doc.id }, doc.data())))
            .filter(submission => {
            var _a, _b, _c;
            const data = submission;
            return ((_a = data.questionText) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(query.toLowerCase())) ||
                ((_b = data.explanation) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(query.toLowerCase())) ||
                ((_c = data.contributorName) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(query.toLowerCase()));
        });
        res.json({
            success: true,
            data: results,
            query,
            count: results.length
        });
    }
    catch (error) {
        console.error('Error searching submissions:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
//# sourceMappingURL=index.js.map