import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Phone, Mail, CheckCircle, Clock } from 'lucide-react';
import { OTPAPIService, validateNepalPhone, validateEmail } from '@/services/otpService';
import { OTPState } from '@/types/otp';
import { useToast } from '@/hooks/use-toast';

const OTPVerification: React.FC = () => {
  const [state, setState] = useState<OTPState>({
    step: 'input',
    type: 'phone',
    identifier: '',
    loading: false,
    error: null,
    success: false,
    expiresAt: null,
    timeRemaining: 0,
    resendAvailable: false,
  });
  
  const [otpValue, setOtpValue] = useState('');
  const { toast } = useToast();

  // Timer for OTP expiry
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.expiresAt && state.step === 'verification') {
      interval = setInterval(() => {
        const now = new Date();
        const timeLeft = Math.max(0, Math.floor((state.expiresAt!.getTime() - now.getTime()) / 1000));
        
        setState(prev => ({
          ...prev,
          timeRemaining: timeLeft,
          resendAvailable: timeLeft === 0,
        }));
        
        if (timeLeft === 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.expiresAt, state.step]);

  const handleSendOTP = async () => {
    // Validate input
    const validation = state.type === 'phone' 
      ? validateNepalPhone(state.identifier)
      : validateEmail(state.identifier);
    
    if (!validation.isValid) {
      setState(prev => ({ ...prev, error: validation.message || 'Invalid input' }));
      return;
    }
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const request = {
        type: state.type,
        ...(state.type === 'phone' ? { phone: state.identifier } : { email: state.identifier }),
      };
      
      const response = await OTPAPIService.generateOTP(request);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          step: 'verification',
          loading: false,
          expiresAt: response.expiresAt ? new Date(response.expiresAt) : null,
          timeRemaining: 300, // 5 minutes
        }));
        
        toast({
          title: "OTP Sent!",
          description: response.message,
        });
      } else {
        setState(prev => ({ ...prev, error: response.message, loading: false }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to send OTP',
        loading: false 
      }));
    }
  };

  const handleVerifyOTP = async () => {
    if (otpValue.length !== 6) {
      setState(prev => ({ ...prev, error: 'Please enter a valid 6-digit OTP' }));
      return;
    }
    
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const request = {
        type: state.type,
        otp: otpValue,
        ...(state.type === 'phone' ? { phone: state.identifier } : { email: state.identifier }),
      };
      
      const response = await OTPAPIService.verifyOTP(request);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          step: 'success',
          loading: false,
          success: true,
        }));
        
        toast({
          title: "Verification Successful!",
          description: response.message,
        });
      } else {
        setState(prev => ({ ...prev, error: response.message, loading: false }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to verify OTP',
        loading: false 
      }));
    }
  };

  const handleResendOTP = async () => {
    setOtpValue('');
    await handleSendOTP();
  };

  const resetFlow = () => {
    setState({
      step: 'input',
      type: 'phone',
      identifier: '',
      loading: false,
      error: null,
      success: false,
      expiresAt: null,
      timeRemaining: 0,
      resendAvailable: false,
    });
    setOtpValue('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (state.step === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-green-700">Verification Successful!</CardTitle>
          <CardDescription>
            Your {state.type === 'phone' ? 'phone number' : 'email address'} has been verified successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={resetFlow} className="w-full">
            Verify Another {state.type === 'phone' ? 'Number' : 'Email'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">OTP Verification</CardTitle>
          <CardDescription className="text-center">
            Verify your identity with a one-time password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.step === 'input' ? (
            <div className="space-y-4">
              <Tabs value={state.type} onValueChange={(value) => setState(prev => ({ ...prev, type: value as 'phone' | 'email', identifier: '', error: null }))}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="phone" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nepal Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      value={state.identifier}
                      onChange={(e) => setState(prev => ({ ...prev, identifier: e.target.value, error: null }))}
                      className="text-base"
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter your Nepal mobile number (NTC, Ncell, or Smart Cell)
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={state.identifier}
                      onChange={(e) => setState(prev => ({ ...prev, identifier: e.target.value, error: null }))}
                      className="text-base"
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter your email address to receive the OTP
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              {state.error && (
                <Alert variant="destructive">
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleSendOTP} 
                disabled={state.loading || !state.identifier}
                className="w-full"
              >
                {state.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  `Send OTP via ${state.type === 'phone' ? 'SMS' : 'Email'}`
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit OTP sent to your {state.type}:
                </p>
                <p className="font-medium">{state.identifier}</p>
                
                {state.timeRemaining > 0 && (
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="outline">
                      Expires in {formatTime(state.timeRemaining)}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP
                    value={otpValue}
                    onChange={setOtpValue}
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
                
                {state.error && (
                  <Alert variant="destructive">
                    <AlertDescription>{state.error}</AlertDescription>
                  </Alert>
                )}
                
                <Button 
                  onClick={handleVerifyOTP} 
                  disabled={state.loading || otpValue.length !== 6}
                  className="w-full"
                >
                  {state.loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the OTP?
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleResendOTP}
                    disabled={state.loading || !state.resendAvailable}
                    className="w-full"
                  >
                    {state.resendAvailable ? 'Resend OTP' : `Resend in ${formatTime(state.timeRemaining)}`}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;