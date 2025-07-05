# Firebase OTP Authentication System

A complete OTP authentication system built with Firebase Authentication, React, TypeScript, and Vite. Features both phone number OTP and email link authentication with a modern UI.

## 🚀 Features

- **Phone Number OTP Authentication**
  - Firebase Phone Auth with SMS OTP
  - reCAPTCHA verification for security
  - Auto-resend with cooldown timer
  - International phone number validation

- **Email Link Authentication**
  - Passwordless sign-in via email links
  - Secure one-time links with expiration
  - Email validation and error handling

- **Security & UX**
  - Firebase Authentication v10+ SDK
  - Form validation with Zod
  - Loading states and error handling
  - Session management
  - Protected routes

- **Modern UI**
  - shadcn/ui components
  - Tailwind CSS styling
  - Responsive design
  - Toast notifications

## 📋 Prerequisites

- Node.js 18+
- Firebase project with Authentication enabled
- Domain configured in Firebase Console

## 🛠️ Setup Instructions

### 1. Firebase Configuration

1. **Create a Firebase Project**
   ```bash
   # Visit https://console.firebase.google.com
   # Create a new project
   ```

2. **Enable Authentication Methods**
   - Go to Authentication > Sign-in method
   - Enable **Phone** authentication
   - Enable **Email link (passwordless sign-in)**

3. **Configure Authorized Domains**
   - Add your domain (e.g., `localhost`, `yourdomain.com`) to authorized domains
   - This is required for email link authentication

4. **Get Firebase Config**
   - Go to Project Settings > General
   - Find your app's Firebase configuration object

### 2. Environment Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo>
   cd <your-repo>
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   
   # Edit .env.local with your Firebase config
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 3. Firebase Console Configuration

#### Phone Authentication Setup
1. **Enable Phone Auth**
   - Authentication > Sign-in method > Phone
   - Enable the provider

2. **reCAPTCHA Configuration**
   - The app uses invisible reCAPTCHA
   - No additional setup needed for development
   - For production, consider adding your domain to reCAPTCHA settings

#### Email Link Authentication Setup
1. **Enable Email Link**
   - Authentication > Sign-in method > Email/Password
   - Enable "Email link (passwordless sign-in)"

2. **Configure Action URL**
   - Authentication > Templates > Email address verification
   - Customize the action URL to point to your domain + `/complete-signin`

### 4. Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

### Phone OTP Authentication

1. **Enter Phone Number**
   - Use international format: `+1234567890`
   - Click "Send OTP"

2. **Verify OTP**
   - Enter the 6-digit code received via SMS
   - Click "Verify OTP"
   - Automatic redirect to dashboard on success

3. **Resend Options**
   - Resend OTP with 60-second cooldown
   - Change phone number option

### Email Link Authentication

1. **Enter Email**
   - Provide valid email address
   - Click "Send Sign-in Link"

2. **Check Email**
   - Check inbox (and spam folder)
   - Click the sign-in link

3. **Auto Sign-in**
   - Automatic authentication and redirect
   - Secure, one-time use links

## 🔧 Components Overview

### Core Components

- **`PhoneAuthForm`** - Phone number OTP authentication
- **`EmailLinkAuthForm`** - Email link authentication  
- **`AuthPage`** - Combined auth page with tabs
- **`Dashboard`** - Protected user dashboard
- **`ProtectedRoute`** - Route protection wrapper

### Firebase Integration

- **`firebase.ts`** - Firebase configuration and auth functions
- **`AuthContext.tsx`** - Authentication state management

### Security Features

- **Input Validation** - Zod schemas for phone/email validation
- **Error Handling** - Comprehensive error messages
- **Session Management** - Secure user session handling
- **Protected Routes** - Authentication-required pages

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use different configs for development/production

2. **Firebase Security Rules**
   - Configure Firestore security rules if using database
   - Set up proper user access controls

3. **Domain Configuration**
   - Only add trusted domains to Firebase authorized domains
   - Use HTTPS in production

4. **Rate Limiting**
   - Firebase automatically handles SMS rate limiting
   - Implement client-side cooldowns for better UX

## 🚀 Deployment

### Vercel/Netlify
```bash
# Build the project
npm run build

# Deploy dist/ folder
# Make sure to set environment variables in your deployment platform
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

## 📚 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Firebase Auth v10+
- **Forms**: React Hook Form, Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **reCAPTCHA Errors**
   - Ensure domain is whitelisted in Firebase Console
   - Check browser console for detailed errors

2. **Email Link Not Working**
   - Verify authorized domains in Firebase
   - Check email link URL format
   - Ensure `/complete-signin` route is accessible

3. **Phone OTP Not Received**
   - Verify phone number format
   - Check Firebase quotas and billing
   - Ensure SMS is enabled for your region

4. **Environment Variables**
   - Ensure all `VITE_` prefixed variables are set
   - Restart development server after changes

### Support

For issues related to:
- **Firebase**: Check [Firebase Documentation](https://firebase.google.com/docs/auth)
- **React**: Check [React Documentation](https://react.dev)
- **Vite**: Check [Vite Documentation](https://vitejs.dev)

---

**Happy Coding! 🎉**
