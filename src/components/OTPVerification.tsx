
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, RefreshCw, Shield, Clock, CheckCircle2 } from 'lucide-react';

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
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      // Simulate verification delay
      setTimeout(() => {
        onVerify(otp);
        setIsVerifying(false);
      }, 1500);
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
    <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 animate-scale-in">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="hover:bg-red-50 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </Button>
          <CardTitle className="text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            OTP प्रमाणीकरण / OTP Verification
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-3">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <p className="text-gray-700 mb-2 font-medium">
              हामीले तपाईंको फोनमा OTP पठाएका छौं
            </p>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-lg font-semibold text-red-600">
              +977 {phoneNumber}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <InputOTP 
            maxLength={6} 
            value={otp} 
            onChange={(value) => setOtp(value)}
            className="gap-3"
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot 
                index={0} 
                className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-red-500 transition-colors duration-200" 
              />
              <InputOTPSlot 
                index={1} 
                className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-red-500 transition-colors duration-200" 
              />
              <InputOTPSlot 
                index={2} 
                className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-red-500 transition-colors duration-200" 
              />
              <InputOTPSlot 
                index={3} 
                className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-red-500 transition-colors duration-200" 
              />
              <InputOTPSlot 
                index={4} 
                className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-red-500 transition-colors duration-200" 
              />
              <InputOTPSlot 
                index={5} 
                className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-red-500 transition-colors duration-200" 
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button 
          className="w-full bg-red-600 hover:bg-red-700 h-12 font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
        >
          {isVerifying ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              प्रमाणित गर्दै... / Verifying...
            </div>
          ) : (
            <>
              <CheckCircle2 className="mr-2" size={18} />
              प्रमाणित गर्नुहोस् / Verify
            </>
          )}
        </Button>

        <div className="text-center space-y-3">
          {!isResendEnabled ? (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>OTP फेरि पठाउन: {formatTime(timeLeft)}</span>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleResend}
              className="text-red-600 hover:bg-red-50 font-medium transition-colors duration-200"
            >
              <RefreshCw size={16} className="mr-2" />
              OTP फेरि पठाउनुहोस् / Resend OTP
            </Button>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-600 space-y-1">
            <p className="font-medium">समस्या छ? ग्राहक सेवामा सम्पर्क गर्नुहोस्</p>
            <p>Having trouble? Contact customer support</p>
            <p className="text-red-600 font-medium">Test OTP: 123456</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
