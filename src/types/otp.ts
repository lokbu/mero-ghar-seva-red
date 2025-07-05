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
  expiresAt?: string;
  rateLimitReset?: number;
}

export interface OTPStatusResponse {
  success: boolean;
  exists: boolean;
  remainingAttempts: number;
}

export interface OTPFormData {
  identifier: string;
  type: 'phone' | 'email';
  otp: string;
}

export interface OTPState {
  step: 'input' | 'verification' | 'success';
  type: 'phone' | 'email';
  identifier: string;
  loading: boolean;
  error: string | null;
  success: boolean;
  expiresAt: Date | null;
  timeRemaining: number;
  resendAvailable: boolean;
}