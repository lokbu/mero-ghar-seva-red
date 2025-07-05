export const config = {
  PORT: process.env.PORT || 3001,
  
  // Twilio Configuration for SMS (Nepal)
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
  
  // Email Configuration
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  
  // OTP Configuration
  OTP_LENGTH: 6,
  OTP_EXPIRY_MINUTES: 5,
  
  // Redis Configuration (for production)
  REDIS_URL: process.env.REDIS_URL || '',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
};