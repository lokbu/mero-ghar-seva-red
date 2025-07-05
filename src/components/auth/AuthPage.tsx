import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PhoneAuthForm from './PhoneAuthForm';
import EmailLinkAuthForm from './EmailLinkAuthForm';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('phone');
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Redirect to dashboard after successful authentication
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account using your preferred method</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phone">
            <PhoneAuthForm onSuccess={handleAuthSuccess} />
          </TabsContent>
          
          <TabsContent value="email">
            <EmailLinkAuthForm onSuccess={handleAuthSuccess} />
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Secure authentication powered by Firebase
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;