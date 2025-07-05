import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { EmailValidation } from '../types/otp';

// Create transporter based on configuration
const createTransporter = () => {
  if (!config.EMAIL_USER || !config.EMAIL_PASS) {
    return null;
  }
  
  return nodemailer.createTransporter({
    service: config.EMAIL_SERVICE,
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });
};

const transporter = createTransporter();

export class EmailService {
  /**
   * Validate email address
   */
  static validateEmail(email: string): EmailValidation {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false };
    }
    
    const domain = email.split('@')[1];
    
    return {
      isValid: true,
      domain,
    };
  }

  /**
   * Send OTP via email
   */
  static async sendOTP(email: string, otp: string): Promise<{ success: boolean; message: string }> {
    try {
      const validation = this.validateEmail(email);
      
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Invalid email address format',
        };
      }
      
      if (!transporter) {
        // For development/testing without email configuration
        console.log(`📧 Email OTP to ${email}: ${otp}`);
        return {
          success: true,
          message: 'OTP sent successfully (development mode)',
        };
      }
      
      const mailOptions = {
        from: `"OTP Verification" <${config.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
              <h2 style="color: #333; margin-bottom: 20px;">OTP Verification</h2>
              <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
                Your One-Time Password (OTP) for verification is:
              </p>
              <div style="background-color: #007bff; color: white; font-size: 32px; font-weight: bold; padding: 15px 30px; border-radius: 5px; display: inline-block; letter-spacing: 8px;">
                ${otp}
              </div>
              <p style="color: #666; font-size: 14px; margin-top: 20px;">
                This code will expire in ${config.OTP_EXPIRY_MINUTES} minutes.
              </p>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                If you didn't request this code, please ignore this email.
              </p>
            </div>
          </div>
        `,
        text: `Your OTP code is: ${otp}. Valid for ${config.OTP_EXPIRY_MINUTES} minutes. Do not share this code with anyone.`,
      };
      
      await transporter.sendMail(mailOptions);
      
      return {
        success: true,
        message: 'OTP sent successfully',
      };
      
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again.',
      };
    }
  }

  /**
   * Check if email service is configured
   */
  static isConfigured(): boolean {
    return !!(config.EMAIL_USER && config.EMAIL_PASS);
  }
}