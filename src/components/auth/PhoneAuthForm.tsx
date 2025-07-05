import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Loader2, Phone, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { setupRecaptcha, sendOTPToPhone } from '@/lib/firebase';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid international phone number (e.g., +1234567890)'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

interface PhoneAuthFormProps {
  onSuccess?: () => void;
}

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({ onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { toast } = useToast();

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    // Initialize reCAPTCHA when component mounts
    const verifier = setupRecaptcha('recaptcha-container');
    setRecaptchaVerifier(verifier);

    return () => {
      // Clean up reCAPTCHA when component unmounts
      if (verifier) {
        verifier.clear();
      }
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const onPhoneSubmit = async (data: PhoneFormData) => {
    if (!recaptchaVerifier) {
      toast({
        title: 'Error',
        description: 'reCAPTCHA not initialized. Please refresh the page.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const confirmation = await sendOTPToPhone(data.phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setPhoneNumber(data.phoneNumber);
      setStep('otp');
      setResendCooldown(60); // 60 seconds cooldown
      toast({
        title: 'OTP Sent',
        description: `Verification code sent to ${data.phoneNumber}`,
      });
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send OTP. Please try again.',
        variant: 'destructive',
      });
      // Reset reCAPTCHA on error
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        const newVerifier = setupRecaptcha('recaptcha-container');
        setRecaptchaVerifier(newVerifier);
      }
    } finally {
      setLoading(false);
    }
  };

  const onOTPSubmit = async (data: OTPFormData) => {
    if (!confirmationResult) {
      toast({
        title: 'Error',
        description: 'No confirmation result found. Please request a new OTP.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await confirmationResult.confirm(data.otp);
      toast({
        title: 'Success',
        description: 'Phone number verified successfully!',
      });
      onSuccess?.();
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: 'Error',
        description: error.message || 'Invalid OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0 || !recaptchaVerifier) return;

    setLoading(true);
    try {
      const confirmation = await sendOTPToPhone(phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setResendCooldown(60);
      toast({
        title: 'OTP Resent',
        description: `New verification code sent to ${phoneNumber}`,
      });
    } catch (error: any) {
      console.error('Error resending OTP:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to resend OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setConfirmationResult(null);
    otpForm.reset();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {step === 'phone' ? 'Sign in with Phone' : 'Verify OTP'}
        </CardTitle>
        <CardDescription className="text-center">
          {step === 'phone'
            ? 'Enter your phone number to receive a verification code'
            : `Enter the 6-digit code sent to ${phoneNumber}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 'phone' ? (
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1234567890"
                  className="pl-10"
                  {...phoneForm.register('phoneNumber')}
                />
              </div>
              {phoneForm.formState.errors.phoneNumber && (
                <p className="text-sm text-destructive">
                  {phoneForm.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send OTP
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <InputOTP
                  maxLength={6}
                  value={otpForm.watch('otp')}
                  onChange={(value) => otpForm.setValue('otp', value)}
                >
                  <InputOTPGroup className="justify-center">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-destructive">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify OTP
              </Button>
            </form>
            
            <div className="flex flex-col space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={resendCooldown > 0 || loading}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={handleBackToPhone}
                disabled={loading}
              >
                Change Phone Number
              </Button>
            </div>
          </div>
        )}
        
        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </CardContent>
    </Card>
  );
};

export default PhoneAuthForm;