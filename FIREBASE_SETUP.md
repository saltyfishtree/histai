# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "histai-submissions")
4. Enable Google Analytics (optional)
5. Select your Google Analytics account
6. Click "Create project"

## 2. Enable Required Services

### Enable Firestore Database
1. In Firebase console, go to "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it with rules later)
4. Select a location close to your users
5. Click "Done"

### Enable App Hosting (Recommended)
1. In Firebase console, go to "Build" → "App Hosting"
2. Follow the setup instructions to connect your GitHub repository
3. This provides automatic deployment with zero configuration

## 3. Get Firebase Configuration

1. In Firebase console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → "Web" (</> icon)
4. Enter app nickname (e.g., "HistAI Web App")
5. Click "Register app"
6. Copy the configuration object

## 4. Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Existing Gemini API Key
API_KEY=your-existing-gemini-api-key
```

Replace the placeholder values with your actual Firebase configuration values.

## 5. Deploy Firestore Security Rules

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init firestore`
4. Choose your Firebase project
5. Accept the default Firestore rules file (`firestore.rules`)
6. Deploy rules: `firebase deploy --only firestore:rules`

## 6. Set up Email Notifications (Optional)

### Option 1: Firebase Extensions (Recommended)
1. Go to "Build" → "Extensions"
2. Search for "Send Email"
3. Install the official "Send Email" extension
4. Configure with your email provider (SendGrid, Mailgun, etc.)
5. Set up triggers for new submissions

### Option 2: Cloud Functions
1. Enable Cloud Functions for Firebase
2. Create a scheduled function to aggregate submissions
3. Use a service like SendGrid or Mailgun to send emails

## 7. Deploy to Firebase App Hosting

1. Connect your GitHub repository to Firebase App Hosting
2. Set environment variables in Firebase console:
   - Go to "Build" → "App Hosting"
   - Select your connected repo
   - Go to "Environment variables"
   - Add all the NEXT_PUBLIC_ variables
3. Trigger a new deployment by pushing to your main branch

## 8. Security Best Practices

- ✅ Firestore rules deny read/update/delete operations for public users
- ✅ Only allow document creation with proper validation
- ✅ Environment variables are properly configured
- ✅ Firebase configuration is secured through rules, not hiding config
- ✅ Rate limiting through Firestore rules (timestamp validation)

## Troubleshooting

### Common Issues

1. **Permission Denied Error**
   - Check if Firestore rules are deployed correctly
   - Verify environment variables are set properly

2. **Module Not Found**
   - Run `npm install` to ensure Firebase SDK is installed
   - Check import paths in your code

3. **Network Errors**
   - Verify Firebase project ID is correct
   - Check if Firestore is enabled in Firebase console

4. **Deployment Issues**
   - Ensure Firebase CLI is latest version
   - Check if App Hosting is properly configured

## Testing

1. Test locally: `npm run dev`
2. Submit a test form to verify data is saved to Firestore
3. Check Firebase console to see submitted data
4. Verify email notifications are working (if configured)

## Monitoring

- Monitor usage in Firebase console
- Set up alerts for quota limits
- Check Cloud Functions logs for errors
- Monitor email delivery rates 