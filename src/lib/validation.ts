// Security validation utilities

export const validatePhoneNumber = (phone: string): boolean => {
  // Validate Nepal phone number format
  const phoneRegex = /^\+?977[0-9]{10}$|^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC compliant max length
};

export const sanitizeInput = (input: string): string => {
  // Remove potential XSS characters and trim whitespace
  return input.trim().replace(/[<>]/g, '').substring(0, 1000); // Limit length
};

export const validateOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = sanitizeInput(phone);
  return cleaned.startsWith('+977') ? cleaned : `+977${cleaned}`;
};

export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, contains letters and numbers
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
};

// Rate limiting helper for client-side
export const createRateLimiter = (maxAttempts: number, timeWindow: number) => {
  const attempts = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = userAttempts.filter(time => now - time < timeWindow);
    
    if (recentAttempts.length >= maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    attempts.set(identifier, recentAttempts);
    return true;
  };
};