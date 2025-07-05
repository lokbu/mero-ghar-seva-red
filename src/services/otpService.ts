import axios from 'axios';
import { OTPRequest, OTPVerifyRequest, OTPResponse, OTPStatusResponse } from '../types/otp';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/otp`,
  timeout: 10000,
});

export class OTPAPIService {
  /**
   * Generate and send OTP
   */
  static async generateOTP(request: OTPRequest): Promise<OTPResponse> {
    try {
      const response = await api.post('/generate', request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }

  /**
   * Verify OTP
   */
  static async verifyOTP(request: OTPVerifyRequest): Promise<OTPResponse> {
    try {
      const response = await api.post('/verify', request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }

  /**
   * Check OTP status
   */
  static async checkOTPStatus(phone?: string, email?: string, type?: 'phone' | 'email'): Promise<OTPStatusResponse> {
    try {
      const response = await api.post('/status', { phone, email, type });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }
}

/**
 * Validate Nepal phone number (client-side)
 */
export const validateNepalPhone = (phone: string): { isValid: boolean; message?: string } => {
  const cleanPhone = phone.replace(/[^+\d]/g, '');
  
  if (!cleanPhone) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  // Nepal phone number patterns
  const nepalMobilePattern = /^\+977(98[0-6]|97[0-9]|96[1-9])\d{7}$/;
  const nepalLandlinePattern = /^\+977[1-9]\d{6,7}$/;
  
  let formattedNumber = cleanPhone;
  
  if (!cleanPhone.startsWith('+977')) {
    if (cleanPhone.startsWith('977')) {
      formattedNumber = '+' + cleanPhone;
    } else if (cleanPhone.startsWith('98') || cleanPhone.startsWith('97') || cleanPhone.startsWith('96')) {
      formattedNumber = '+977' + cleanPhone;
    } else {
      return { isValid: false, message: 'Please enter a valid Nepal phone number' };
    }
  }
  
  const isMobileValid = nepalMobilePattern.test(formattedNumber);
  const isLandlineValid = nepalLandlinePattern.test(formattedNumber);
  
  if (!isMobileValid && !isLandlineValid) {
    return { isValid: false, message: 'Please enter a valid Nepal phone number' };
  }
  
  return { isValid: true };
};

/**
 * Validate email address (client-side)
 */
export const validateEmail = (email: string): { isValid: boolean; message?: string } => {
  if (!email) {
    return { isValid: false, message: 'Email address is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};