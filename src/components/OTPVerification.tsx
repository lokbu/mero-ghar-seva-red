
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResend: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  phoneNumber, 
  onVerify, 
  onBack, 
  onResend 
}) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [timeLeft]);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleResend = () => {
    onResend();
    setTimeLeft(120);
    setIsResendEnabled(false);
    setOtp('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="hover:bg-red-50"
          >
            <ArrowLeft size={20} />
          </Button>
          <CardTitle className="text-gray-800">OTP प्रमाणीकरण / OTP Verification</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            हामीले तपाईंको फोनमा OTP पठाएका छौं
          </p>
          <p className="text-sm text-gray-500 mb-4">
            We've sent an OTP to <span className="font-semibold">+977 {phoneNumber}</span>
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP 
            maxLength={6} 
            value={otp} 
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button 
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={handleVerify}
          disabled={otp.length !== 6}
        >
          प्रमाणित गर्नुहोस् / Verify
        </Button>

        <div className="text-center space-y-2">
          {!isResendEnabled ? (
            <p className="text-sm text-gray-500">
              OTP फेरि पठाउन: {formatTime(timeLeft)}
            </p>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleResend}
              className="text-red-600 hover:bg-red-50"
            >
              <RefreshCw size={16} className="mr-2" />
              OTP फेरि पठाउनुहोस् / Resend OTP
            </Button>
          )}
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>समस्या छ? ग्राहक सेवामा सम्पर्क गर्नुहोस्</p>
          <p>Having trouble? Contact customer support</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
