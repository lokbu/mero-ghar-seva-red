export interface OTPRequest {
  phone?: string;
  email?: string;
  type: 'phone' | 'email';
}

export interface OTPVerifyRequest {
  phone?: string;
  email?: string;
  otp: string;
  type: 'phone' | 'email';
}

export interface OTPResponse {
  success: boolean;
  message: string;
  expiresAt?: Date;
  rateLimitReset?: number;
}

export interface StoredOTP {
  code: string;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
}

export interface NepalPhoneValidation {
  isValid: boolean;
  formattedNumber?: string;
  carrier?: string;
}

export interface EmailValidation {
  isValid: boolean;
  domain?: string;
}