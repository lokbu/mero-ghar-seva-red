import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCURxuEVm-7tInXjvUw0La4PyUcwbeqgTc",
  authDomain: "sajilo-sew.firebaseapp.com",
  projectId: "sajilo-sew",
  storageBucket: "sajilo-sew.firebasestorage.app",
  messagingSenderId: "386309281061",
  appId: "1:386309281061:web:1a6136705da8bbbed1f6cc",
  measurementId: "G-FFRYPF3ZNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set up reCAPTCHA for phone authentication
export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  // Clear any existing reCAPTCHA first
  const existingContainer = document.getElementById(containerId);
  if (existingContainer) {
    existingContainer.innerHTML = '';
  }
  
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  });
};

// Phone authentication
export const sendOTPToPhone = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Email link authentication
export const sendEmailLink = async (email: string) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: window.location.origin + '/complete-signin',
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save the email locally so you don't need to ask the user for it again
    window.localStorage.setItem('emailForSignIn', email);
  } catch (error) {
    console.error('Error sending email link:', error);
    throw error;
  }
};

// Complete email link sign in
export const completeEmailLinkSignIn = async (email?: string) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let emailForSignIn = email || window.localStorage.getItem('emailForSignIn');
    
    if (!emailForSignIn) {
      // If missing email, prompt user for it
      emailForSignIn = window.prompt('Please provide your email for confirmation');
    }

    if (emailForSignIn) {
      try {
        const result = await signInWithEmailLink(auth, emailForSignIn, window.location.href);
        // Clear email from storage
        window.localStorage.removeItem('emailForSignIn');
        return result;
      } catch (error) {
        console.error('Error completing email link sign in:', error);
        throw error;
      }
    }
  }
  return null;
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export default app;