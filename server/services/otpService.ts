import { StoredOTP } from '../types/otp';
import { config } from '../config/environment';

// In-memory storage for development (use Redis in production)
const otpStore = new Map<string, StoredOTP>();

export class OTPService {
  /**
   * Generate a random OTP code
   */
  static generateOTP(): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < config.OTP_LENGTH; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
  }

  /**
   * Store OTP with expiry time
   */
  static storeOTP(identifier: string, otp: string): Date {
    const expiresAt = new Date(Date.now() + config.OTP_EXPIRY_MINUTES * 60 * 1000);
    
    const storedOTP: StoredOTP = {
      code: otp,
      expiresAt,
      attempts: 0,
      maxAttempts: 3,
    };
    
    otpStore.set(identifier, storedOTP);
    
    // Auto-cleanup expired OTPs
    setTimeout(() => {
      otpStore.delete(identifier);
    }, config.OTP_EXPIRY_MINUTES * 60 * 1000);
    
    return expiresAt;
  }

  /**
   * Verify OTP
   */
  static verifyOTP(identifier: string, inputOTP: string): { isValid: boolean; message: string } {
    const storedData = otpStore.get(identifier);
    
    if (!storedData) {
      return { isValid: false, message: 'OTP not found or expired' };
    }
    
    if (new Date() > storedData.expiresAt) {
      otpStore.delete(identifier);
      return { isValid: false, message: 'OTP has expired' };
    }
    
    storedData.attempts++;
    
    if (storedData.attempts > storedData.maxAttempts) {
      otpStore.delete(identifier);
      return { isValid: false, message: 'Maximum attempts exceeded' };
    }
    
    if (storedData.code !== inputOTP) {
      return { isValid: false, message: 'Invalid OTP' };
    }
    
    // OTP is valid, remove from store
    otpStore.delete(identifier);
    return { isValid: true, message: 'OTP verified successfully' };
  }

  /**
   * Check if OTP exists and is valid
   */
  static otpExists(identifier: string): boolean {
    const storedData = otpStore.get(identifier);
    return storedData !== undefined && new Date() <= storedData.expiresAt;
  }

  /**
   * Get remaining attempts for an OTP
   */
  static getRemainingAttempts(identifier: string): number {
    const storedData = otpStore.get(identifier);
    if (!storedData) return 0;
    return Math.max(0, storedData.maxAttempts - storedData.attempts);
  }

  /**
   * Clean up expired OTPs
   */
  static cleanupExpiredOTPs(): void {
    const now = new Date();
    for (const [identifier, storedData] of otpStore.entries()) {
      if (now > storedData.expiresAt) {
        otpStore.delete(identifier);
      }
    }
  }
}

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
  OTPService.cleanupExpiredOTPs();
}, 5 * 60 * 1000);