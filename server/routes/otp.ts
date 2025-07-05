import express from 'express';
import { OTPService } from '../services/otpService';
import { SMSService } from '../services/smsService';
import { EmailService } from '../services/emailService';
import { OTPRequest, OTPVerifyRequest, OTPResponse } from '../types/otp';

const router = express.Router();

/**
 * Generate and send OTP
 */
router.post('/generate', async (req, res) => {
  try {
    const { phone, email, type }: OTPRequest = req.body;
    
    if (!type || (type !== 'phone' && type !== 'email')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be "phone" or "email"',
      });
    }
    
    if (type === 'phone' && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required for phone OTP',
      });
    }
    
    if (type === 'email' && !email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required for email OTP',
      });
    }
    
    const identifier = type === 'phone' ? phone! : email!;
    
    // Check if OTP already exists and is valid
    if (OTPService.otpExists(identifier)) {
      return res.status(429).json({
        success: false,
        message: 'OTP already sent. Please wait before requesting again.',
      });
    }
    
    // Generate OTP
    const otp = OTPService.generateOTP();
    
    // Send OTP
    let sendResult;
    if (type === 'phone') {
      sendResult = await SMSService.sendOTP(phone!, otp);
    } else {
      sendResult = await EmailService.sendOTP(email!, otp);
    }
    
    if (!sendResult.success) {
      return res.status(500).json({
        success: false,
        message: sendResult.message,
      });
    }
    
    // Store OTP
    const expiresAt = OTPService.storeOTP(identifier, otp);
    
    const response: OTPResponse = {
      success: true,
      message: `OTP sent successfully to your ${type}`,
      expiresAt,
    };
    
    res.json(response);
    
  } catch (error) {
    console.error('OTP generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * Verify OTP
 */
router.post('/verify', async (req, res) => {
  try {
    const { phone, email, otp, type }: OTPVerifyRequest = req.body;
    
    if (!type || (type !== 'phone' && type !== 'email')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be "phone" or "email"',
      });
    }
    
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP is required',
      });
    }
    
    if (type === 'phone' && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required for phone OTP verification',
      });
    }
    
    if (type === 'email' && !email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required for email OTP verification',
      });
    }
    
    const identifier = type === 'phone' ? phone! : email!;
    
    // Verify OTP
    const verificationResult = OTPService.verifyOTP(identifier, otp);
    
    const response: OTPResponse = {
      success: verificationResult.isValid,
      message: verificationResult.message,
    };
    
    if (verificationResult.isValid) {
      res.json(response);
    } else {
      res.status(400).json(response);
    }
    
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * Check OTP status
 */
router.post('/status', async (req, res) => {
  try {
    const { phone, email, type } = req.body;
    
    if (!type || (type !== 'phone' && type !== 'email')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be "phone" or "email"',
      });
    }
    
    const identifier = type === 'phone' ? phone : email;
    
    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: `${type} is required`,
      });
    }
    
    const exists = OTPService.otpExists(identifier);
    const remainingAttempts = OTPService.getRemainingAttempts(identifier);
    
    res.json({
      success: true,
      exists,
      remainingAttempts,
    });
    
  } catch (error) {
    console.error('OTP status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export { router as otpRouter };