import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { otpRouter } from './routes/otp';
import { config } from './config/environment';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting for OTP endpoints
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many OTP requests from this IP, please try again later.',
  },
});

// Routes
app.use('/api/otp', otpLimiter, otpRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = config.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 OTP Server running on port ${PORT}`);
  console.log(`📧 Email service: ${config.EMAIL_SERVICE || 'Not configured'}`);
  console.log(`📱 SMS service: ${config.TWILIO_ACCOUNT_SID ? 'Configured' : 'Not configured'}`);
});