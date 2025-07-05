
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, User, Briefcase, Shield, CheckCircle } from 'lucide-react';
import OTPVerification from '@/components/OTPVerification';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "गलत फोन नम्बर / Invalid Phone Number",
        description: "कृपया सही फोन नम्बर राख्नुहोस् / Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      console.log('Sending OTP to:', phoneNumber);
      setShowOTP(true);
      setIsLoading(false);
      toast({
        title: "OTP पठाइयो / OTP Sent", 
        description: `OTP ${phoneNumber} मा पठाइयो / OTP sent to ${phoneNumber}`,
        variant: "default"
      });
    }, 1500);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast({
        title: "गलत जानकारी / Invalid Information",
        description: "कृपया इमेल र पासवर्ड राख्नुहोस् / Please enter email and password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "सफल / Success",
        description: "सफलतापूर्वक लगइन भयो / Successfully logged in"
      });
      // Redirect based on user type
      if (userType === 'customer') {
        window.location.href = '/customer';
      } else {
        window.location.href = '/provider';
      }
    }, 1500);
  };

  const handleVerifyOTP = (otp: string) => {
    console.log('Verifying OTP:', otp);
    
    if (otp === '123456') {
      toast({
        title: "सफल / Success",
        description: "सफलतापूर्वक लगइन भयो / Successfully logged in",
        variant: "default"
      });
      setTimeout(() => {
        if (userType === 'customer') {
          window.location.href = '/customer';
        } else {
          window.location.href = '/provider';
        }
      }, 1000);
    } else {
      toast({
        title: "गलत OTP / Invalid OTP",
        description: "कृपया सही OTP राख्नुहोस् / Please enter correct OTP",
        variant: "destructive"
      });
    }
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', phoneNumber);
    toast({
      title: "OTP फेरि पठाइयो / OTP Resent",
      description: `नयाँ OTP ${phoneNumber} मा पठाइयो / New OTP sent to ${phoneNumber}`
    });
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setPhoneNumber('');
  };

  if (showOTP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">Sajilo Sewa</h1>
            <p className="text-gray-600">घरका सबै सेवा एकै ठाउँमा</p>
            <p className="text-sm text-gray-500">All home services in one place</p>
          </div>
          
          <OTPVerification
            phoneNumber={phoneNumber}
            onVerify={handleVerifyOTP}
            onBack={handleBackToLogin}
            onResend={handleResendOTP}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Sajilo Sewa</h1>
          <p className="text-gray-600">घरका सबै सेवा एकै ठाउँमा</p>
          <p className="text-sm text-gray-500">All home services in one place</p>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/95 animate-scale-in">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-gray-800 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-red-600" />
              खाता खोल्नुहोस् / Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection with improved styling */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={userType === 'customer' ? 'default' : 'outline'}
                className={`h-20 flex flex-col gap-2 transition-all duration-200 ${
                  userType === 'customer' 
                    ? 'bg-red-600 hover:bg-red-700 shadow-lg scale-105' 
                    : 'border-red-200 hover:bg-red-50 hover:border-red-300'
                }`}
                onClick={() => setUserType('customer')}
              >
                <User size={24} />
                <span className="text-sm font-medium">ग्राहक / Customer</span>
              </Button>
              <Button
                variant={userType === 'provider' ? 'default' : 'outline'}
                className={`h-20 flex flex-col gap-2 transition-all duration-200 ${
                  userType === 'provider' 
                    ? 'bg-red-600 hover:bg-red-700 shadow-lg scale-105' 
                    : 'border-red-200 hover:bg-red-50 hover:border-red-300'
                }`}
                onClick={() => setUserType('provider')}
              >
                <Briefcase size={24} />
                <span className="text-sm font-medium">सेवाप्रदायक / Provider</span>
              </Button>
            </div>

            {/* Enhanced Login Method Tabs */}
            <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'phone' | 'email')}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="phone" className="text-sm font-medium">
                  <Phone className="w-4 h-4 mr-2" />
                  फोन / Phone
                </TabsTrigger>
                <TabsTrigger value="email" className="text-sm font-medium">
                  <Mail className="w-4 h-4 mr-2" />
                  इमेल / Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">फोन नम्बर / Phone Number</Label>
                  <div className="flex shadow-sm">
                    <div className="bg-gray-100 px-4 py-3 rounded-l-md border border-r-0 text-sm font-medium flex items-center">
                      +977
                    </div>
                    <Input
                      id="phone"
                      placeholder="98XXXXXXXX"
                      className="rounded-l-none border-l-0 focus:ring-red-500 focus:border-red-500 h-12"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 h-12 font-medium transition-all duration-200 hover:shadow-lg"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      पठाउँदै... / Sending...
                    </div>
                  ) : (
                    <>
                      <Phone className="mr-2" size={18} />
                      OTP पठाउनुहोस् / Send OTP
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">इमेल / Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="focus:ring-red-500 focus:border-red-500 h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">पासवर्ड / Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="focus:ring-red-500 focus:border-red-500 h-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 h-12 font-medium transition-all duration-200 hover:shadow-lg"
                  onClick={handleEmailLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      लगइन गर्दै... / Logging in...
                    </div>
                  ) : (
                    <>
                      <Mail className="mr-2" size={18} />
                      लगइन / Login
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>

            {/* Enhanced Social Login Section */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">वा / Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-red-200 hover:bg-red-50 h-12 transition-all duration-200">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-red-200 hover:bg-red-50 h-12 transition-all duration-200">
                <svg className="mr-2 h-5 w-5 fill-blue-600" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              नयाँ खाता खोल्नुहोस्? <span className="text-red-600 cursor-pointer hover:underline font-medium">साइन अप / Sign Up</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
