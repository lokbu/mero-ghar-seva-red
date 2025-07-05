
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, User, Briefcase } from 'lucide-react';
import OTPVerification from '@/components/OTPVerification';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [userType, setUserType] = useState<'customer' | 'provider'>('customer');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "गलत फोन नम्बर / Invalid Phone Number",
        description: "कृपया सही फोन नम्बर राख्नुहोस् / Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    // Simulate OTP sending
    console.log('Sending OTP to:', phoneNumber);
    setShowOTP(true);
    toast({
      title: "OTP पठाइयो / OTP Sent", 
      description: `OTP ${phoneNumber} मा पठाइयो / OTP sent to ${phoneNumber}`
    });
  };

  const handleVerifyOTP = (otp: string) => {
    // Simulate OTP verification
    console.log('Verifying OTP:', otp);
    
    // For demo purposes, accept any 6-digit OTP
    if (otp === '123456') {
      toast({
        title: "सफल / Success",
        description: "सफलतापूर्वक लगइन भयो / Successfully logged in"
      });
      // Redirect to dashboard based on user type
      if (userType === 'customer') {
        window.location.href = '/customer';
      } else {
        window.location.href = '/provider';
      }
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
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Sajilo Sewa</h1>
          <p className="text-gray-600">घरका सबै सेवा एकै ठाउँमा</p>
          <p className="text-sm text-gray-500">All home services in one place</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-gray-800">खाता खोल्नुहोस् / Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={userType === 'customer' ? 'default' : 'outline'}
                className={`h-16 flex flex-col gap-1 ${userType === 'customer' ? 'bg-red-600 hover:bg-red-700' : 'border-red-200 hover:bg-red-50'}`}
                onClick={() => setUserType('customer')}
              >
                <User size={20} />
                <span className="text-xs">ग्राहक / Customer</span>
              </Button>
              <Button
                variant={userType === 'provider' ? 'default' : 'outline'}
                className={`h-16 flex flex-col gap-1 ${userType === 'provider' ? 'bg-red-600 hover:bg-red-700' : 'border-red-200 hover:bg-red-50'}`}
                onClick={() => setUserType('provider')}
              >
                <Briefcase size={20} />
                <span className="text-xs">सेवाप्रदायक / Provider</span>
              </Button>
            </div>

            {/* Login Method Tabs */}
            <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'phone' | 'email')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone" className="text-xs">फोन / Phone</TabsTrigger>
                <TabsTrigger value="email" className="text-xs">इमेल / Email</TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">फोन नम्बर / Phone Number</Label>
                  <div className="flex">
                    <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 text-sm">+977</div>
                    <Input
                      id="phone"
                      placeholder="98XXXXXXXX"
                      className="rounded-l-none border-l-0 focus:ring-red-500"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleSendOTP}
                >
                  <Phone className="mr-2" size={16} />
                  OTP पठाउनुहोस् / Send OTP
                </Button>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">इमेल / Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">पासवर्ड / Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="focus:ring-red-500"
                  />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Mail className="mr-2" size={16} />
                  लगइन / Login
                </Button>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">वा / Or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-red-200 hover:bg-red-50">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-red-200 hover:bg-red-50">
                <svg className="mr-2 h-4 w-4 fill-blue-600" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500">
              नयाँ खाता खोल्नुहोस्? <span className="text-red-600 cursor-pointer">साइन अप / Sign Up</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
