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
  apiKey: "AIzaSyBGkHJX9QrVvNwWQdN8Xr1a2b3c4d5e6f7",
  authDomain: "sajilo-sewa-demo.firebaseapp.com",
  projectId: "sajilo-sewa-demo",
  storageBucket: "sajilo-sewa-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set up reCAPTCHA for phone authentication
export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
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