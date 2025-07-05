# Firebase Setup Guide for OTP Authentication

This guide will help you set up Firebase Authentication for both Phone OTP and Email Link authentication.

## 🔥 Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com](https://console.firebase.google.com)
   - Click "Create a project" or "Add project"

2. **Project Setup**
   - Enter project name (e.g., "my-otp-app")
   - Choose whether to enable Google Analytics (optional)
   - Click "Create project"

## 🔧 Step 2: Set Up Web App

1. **Add Web App**
   - In your Firebase project dashboard
   - Click the "Web" icon (`</>`) to add a web app
   - Register app with nickname (e.g., "OTP Auth App")
   - **Important**: Check "Also set up Firebase Hosting" if you plan to deploy

2. **Get Configuration**
   - Copy the Firebase configuration object
   - It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```

## 🛡️ Step 3: Enable Authentication Methods

### Phone Authentication

1. **Navigate to Authentication**
   - Go to Authentication > Sign-in method
   - Click on "Phone" provider

2. **Enable Phone Auth**
   - Toggle "Enable" to ON
   - Click "Save"

3. **Test Phone Numbers (Optional)**
   - For development, you can add test phone numbers
   - Scroll down to "Phone numbers for testing"
   - Add: `+1 650-555-3434` with code: `123456`
   - This allows testing without sending real SMS

### Email Link Authentication

1. **Enable Email/Password**
   - In Authentication > Sign-in method
   - Click on "Email/Password" provider
   - Enable "Email/Password" (first toggle)
   - **Important**: Enable "Email link (passwordless sign-in)" (second toggle)
   - Click "Save"

## 🌐 Step 4: Configure Authorized Domains

1. **Add Domains**
   - Go to Authentication > Settings > Authorized domains
   - Default domains include:
     - `localhost` (for development)
     - `your-project.firebaseapp.com` (Firebase hosting)

2. **Add Custom Domains**
   - Click "Add domain"
   - Add your production domain (e.g., `yourdomain.com`)
   - Add any staging domains you use

## 📧 Step 5: Email Templates (Optional)

1. **Customize Email Templates**
   - Go to Authentication > Templates
   - Click "Email address verification"
   - Customize the email template as needed
   - Ensure the action URL points to your domain + `/complete-signin`

## 🔑 Step 6: Environment Configuration

1. **Create Environment File**
   ```bash
   # Create .env.local in your project root
   cp .env.example .env.local
   ```

2. **Add Firebase Config**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

## 🧪 Step 7: Testing Setup

### Test Phone Authentication

1. **Development Testing**
   - Use test phone number: `+1 650-555-3434`
   - Use test code: `123456`
   - No SMS will be sent, but authentication will work

2. **Production Testing**
   - Use your real phone number
   - Ensure SMS delivery works in your region
   - Check Firebase console for usage/quota

### Test Email Authentication

1. **Local Testing**
   - Use any valid email address
   - Check spam folder for sign-in links
   - Ensure link format: `http://localhost:5173/complete-signin?...`

2. **Production Testing**
   - Verify email links work with your domain
   - Test link expiration (default: 1 hour)

## 🚀 Step 8: Production Deployment

### Firebase Hosting (Recommended)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and Initialize**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure Build**
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Other Platforms (Vercel, Netlify, etc.)

1. **Add Environment Variables**
   - Add all `VITE_FIREBASE_*` variables
   - Ensure they match your Firebase config

2. **Update Authorized Domains**
   - Add your deployment URL to Firebase authorized domains
   - Update email action URLs if needed

## 🔒 Security Considerations

### Production Settings

1. **API Key Restrictions** (Recommended)
   - Go to Google Cloud Console > APIs & Services > Credentials
   - Find your Firebase API key
   - Add application restrictions (HTTP referrers)
   - Add your domains only

2. **Firebase Security Rules**
   - If using Firestore/Storage, configure security rules
   - Example rule: Only authenticated users can access data

3. **Rate Limiting**
   - Monitor SMS usage in Firebase console
   - Set up billing alerts
   - Consider implementing additional client-side rate limiting

### Environment Security

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use different Firebase projects for dev/staging/prod
   - Rotate API keys periodically

2. **Domain Security**
   - Only add trusted domains to authorized domains
   - Use HTTPS in production
   - Validate redirects and callbacks

## 📊 Monitoring & Analytics

1. **Authentication Analytics**
   - Monitor sign-in success/failure rates
   - Track user engagement
   - Set up alerts for unusual activity

2. **Error Monitoring**
   - Set up error tracking (Sentry, etc.)
   - Monitor console errors
   - Track authentication failures

## 🆘 Troubleshooting

### Common Issues

1. **reCAPTCHA Issues**
   ```
   Error: Firebase: Error (auth/app-not-authorized)
   ```
   - Solution: Add domain to authorized domains
   - Check reCAPTCHA site key configuration

2. **Email Link Issues**
   ```
   Error: Firebase: Error (auth/invalid-action-code)
   ```
   - Solution: Check email link hasn't expired
   - Verify authorized domains include your domain

3. **Phone OTP Issues**
   ```
   Error: Firebase: Error (auth/too-many-requests)
   ```
   - Solution: Wait for rate limit reset
   - Use test phone numbers for development

4. **Environment Variable Issues**
   ```
   Error: Firebase: No Firebase App '[DEFAULT]' has been created
   ```
   - Solution: Check all VITE_ prefixed env vars are set
   - Restart development server

### Getting Help

- **Firebase Support**: [Firebase Support](https://firebase.google.com/support)
- **Community**: [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- **Documentation**: [Firebase Auth Docs](https://firebase.google.com/docs/auth)

---

## ✅ Setup Checklist

- [ ] Firebase project created
- [ ] Web app registered and configured
- [ ] Phone authentication enabled
- [ ] Email link authentication enabled
- [ ] Authorized domains configured
- [ ] Environment variables set
- [ ] Local development tested
- [ ] Production deployment configured
- [ ] Security settings reviewed

**You're ready to go! 🎉**