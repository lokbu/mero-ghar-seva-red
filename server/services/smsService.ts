import twilio from 'twilio';
import { config } from '../config/environment';
import { NepalPhoneValidation } from '../types/otp';

const twilioClient = config.TWILIO_ACCOUNT_SID && config.TWILIO_AUTH_TOKEN 
  ? twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)
  : null;

export class SMSService {
  /**
   * Validate Nepal phone number
   */
  static validateNepalPhone(phone: string): NepalPhoneValidation {
    // Remove spaces, dashes, and other non-numeric characters
    const cleanPhone = phone.replace(/[^+\d]/g, '');
    
    // Nepal phone number patterns:
    // Mobile: +977-98XXXXXXXX (NTC: 980, 981, 982, 984, 985, 986)
    // Mobile: +977-97XXXXXXXX (Ncell: 970, 971, 972, 973, 974, 975, 976, 977, 978, 979)
    // Mobile: +977-96XXXXXXXX (Smart Cell: 961, 962, 963, 964, 965, 966, 967, 968, 969)
    // Landline: +977-1-XXXXXXX (Kathmandu area code)
    
    const nepalMobilePattern = /^\+977(98[0-6]|97[0-9]|96[1-9])\d{7}$/;
    const nepalLandlinePattern = /^\+977[1-9]\d{6,7}$/;
    
    let formattedNumber = cleanPhone;
    
    // If number doesn't start with +977, add it
    if (!cleanPhone.startsWith('+977')) {
      if (cleanPhone.startsWith('977')) {
        formattedNumber = '+' + cleanPhone;
      } else if (cleanPhone.startsWith('98') || cleanPhone.startsWith('97') || cleanPhone.startsWith('96')) {
        formattedNumber = '+977' + cleanPhone;
      } else {
        return { isValid: false };
      }
    }
    
    const isMobileValid = nepalMobilePattern.test(formattedNumber);
    const isLandlineValid = nepalLandlinePattern.test(formattedNumber);
    
    if (!isMobileValid && !isLandlineValid) {
      return { isValid: false };
    }
    
    // Determine carrier based on prefix
    let carrier = 'Unknown';
    if (formattedNumber.includes('98')) {
      carrier = 'Nepal Telecom (NTC)';
    } else if (formattedNumber.includes('97')) {
      carrier = 'Ncell';
    } else if (formattedNumber.includes('96')) {
      carrier = 'Smart Cell';
    }
    
    return {
      isValid: true,
      formattedNumber,
      carrier,
    };
  }

  /**
   * Send OTP via SMS to Nepal phone number
   */
  static async sendOTP(phone: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      const validation = this.validateNepalPhone(phone);
      
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Invalid Nepal phone number format',
        };
      }
      
      if (!twilioClient) {
        // For development/testing without Twilio
        console.log(`📱 SMS OTP to ${validation.formattedNumber}: ${otp}`);
        return {
          success: true,
          message: 'OTP sent successfully (development mode)',
        };
      }
      
      const message = `Your OTP code is: ${otp}. Valid for ${config.OTP_EXPIRY_MINUTES} minutes. Do not share this code with anyone.`;
      
      await twilioClient.messages.create({
        body: message,
        from: config.TWILIO_PHONE_NUMBER,
        to: validation.formattedNumber,
      });
      
      return {
        success: true,
        message: 'OTP sent successfully',
      };
      
    } catch (error) {
      console.error('SMS sending error:', error);
      return {
        success: false,
        message: 'Failed to send SMS. Please try again.',
      };
    }
  }

  /**
   * Check if SMS service is configured
   */
  static isConfigured(): boolean {
    return !!(config.TWILIO_ACCOUNT_SID && config.TWILIO_AUTH_TOKEN && config.TWILIO_PHONE_NUMBER);
  }
}