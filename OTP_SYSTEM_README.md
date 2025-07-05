# 🔐 Nepal OTP Verification System

A complete, fast, and secure OTP (One-Time Password) verification system designed specifically for Nepal phone numbers and email addresses. Built with React, TypeScript, Express, and modern UI components.

## ✨ Features

- **🇳🇵 Nepal Phone Support**: Full support for Nepal mobile numbers (NTC, Ncell, Smart Cell)
- **📧 Email Verification**: Email OTP with beautiful HTML templates
- **⚡ Real-time**: Fast OTP generation and verification
- **🔒 Secure**: Rate limiting, input validation, and secure OTP storage
- **⏱️ Time-limited**: Configurable OTP expiry (default 5 minutes)
- **🎨 Beautiful UI**: Modern, responsive design with ShadCN UI
- **📱 Mobile-friendly**: Works perfectly on all devices

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend API URL
VITE_API_URL=http://localhost:3001

# Twilio SMS Configuration (for Nepal SMS)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Run the Application

Start both frontend and backend:

```bash
npm run full-dev
```

Or run them separately:

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run server
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **OTP Verification**: http://localhost:5173/otp

## 📱 Nepal Phone Number Support

The system supports all major Nepal telecom operators:

### Supported Formats:
- **NTC**: +977 98X XXXX XXX (980, 981, 982, 984, 985, 986)
- **Ncell**: +977 97X XXXX XXX (970-979)
- **Smart Cell**: +977 96X XXXX XXX (961-969)

### Input Examples:
- `+977 9841234567`
- `9841234567`
- `977 9841234567`

The system automatically formats and validates Nepal phone numbers.

## 🔧 Configuration

### OTP Settings

Default OTP configuration in `server/config/environment.ts`:

```typescript
OTP_LENGTH: 6,           // 6-digit OTP codes
OTP_EXPIRY_MINUTES: 5,   // 5 minutes expiry
```

### Rate Limiting

- **5 requests per 15 minutes** per IP address
- Prevents spam and abuse

### Security Features

- Input validation for phone numbers and emails
- OTP code encryption and secure storage
- Automatic cleanup of expired OTPs
- Maximum 3 verification attempts per OTP

## 🛠️ API Endpoints

### Generate OTP

```bash
POST /api/otp/generate
Content-Type: application/json

{
  "type": "phone",
  "phone": "+977 9841234567"
}
```

### Verify OTP

```bash
POST /api/otp/verify
Content-Type: application/json

{
  "type": "phone",
  "phone": "+977 9841234567",
  "otp": "123456"
}
```

### Check OTP Status

```bash
POST /api/otp/status
Content-Type: application/json

{
  "type": "phone",
  "phone": "+977 9841234567"
}
```

## 🎨 UI Components

The system uses modern UI components:

- **Input Fields**: Phone number and email input with validation
- **OTP Input**: Beautiful 6-digit OTP input component
- **Timer**: Real-time countdown for OTP expiry
- **Animations**: Smooth transitions and loading states
- **Responsive**: Works on all screen sizes

## 🔌 Service Configuration

### Twilio SMS Setup

1. Create a Twilio account at https://www.twilio.com/
2. Get your Account SID and Auth Token
3. Purchase a phone number for SMS sending
4. Add credentials to your `.env` file

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate a new app password
3. Use the app password in your `.env` file

## 📊 Development vs Production

### Development Mode

Without proper service configuration, the system runs in development mode:

- **SMS**: OTP codes are logged to console
- **Email**: OTP codes are logged to console
- **Storage**: In-memory storage (resets on restart)

### Production Mode

With proper service configuration:

- **SMS**: Real SMS delivery via Twilio
- **Email**: Real email delivery via configured service
- **Storage**: Redis-based storage (persistent)

## 🌟 Usage Examples

### Phone Verification

```typescript
// Send OTP to Nepal phone number
const response = await OTPAPIService.generateOTP({
  type: 'phone',
  phone: '+977 9841234567'
});

// Verify OTP
const verifyResponse = await OTPAPIService.verifyOTP({
  type: 'phone',
  phone: '+977 9841234567',
  otp: '123456'
});
```

### Email Verification

```typescript
// Send OTP to email
const response = await OTPAPIService.generateOTP({
  type: 'email',
  email: 'user@example.com'
});

// Verify OTP
const verifyResponse = await OTPAPIService.verifyOTP({
  type: 'email',
  email: 'user@example.com',
  otp: '123456'
});
```

## 🔍 Troubleshooting

### Common Issues

1. **SMS not sending**: Check Twilio credentials and phone number
2. **Email not sending**: Verify Gmail app password and settings
3. **CORS errors**: Ensure API URL is correct in environment
4. **TypeScript errors**: Run `npm install` to install all dependencies

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

## 📦 Dependencies

### Backend
- Express.js - Web framework
- Twilio - SMS service
- Nodemailer - Email service
- TypeScript - Type safety

### Frontend
- React - UI framework
- ShadCN UI - Component library
- Tailwind CSS - Styling
- Axios - HTTP client

## 🚀 Deployment

### Production Deployment

1. Set up Redis for OTP storage
2. Configure production environment variables
3. Set up proper SMS and email services
4. Enable HTTPS for security
5. Configure rate limiting and monitoring

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
REDIS_URL=redis://your-redis-url
TWILIO_ACCOUNT_SID=your_production_sid
TWILIO_AUTH_TOKEN=your_production_token
EMAIL_USER=your_production_email
EMAIL_PASS=your_production_password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Test with development mode first

---

**Built with ❤️ for Nepal** 🇳🇵