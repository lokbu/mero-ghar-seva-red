import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { completeEmailLinkSignIn } from '@/lib/firebase';

const EmailLinkCompletion: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        setLoading(true);
        const result = await completeEmailLinkSignIn();
        
        if (result) {
          setSuccess(true);
          toast({
            title: 'Sign-in Successful',
            description: 'You have been signed in successfully!',
          });
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setError('Invalid or expired sign-in link');
        }
      } catch (error: any) {
        console.error('Error completing email link sign in:', error);
        let errorMessage = 'Failed to complete sign-in. Please try again.';
        
        if (error.code === 'auth/invalid-action-code') {
          errorMessage = 'Invalid or expired sign-in link.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address.';
        } else if (error.code === 'auth/user-disabled') {
          errorMessage = 'This email address has been disabled.';
        }
        
        setError(errorMessage);
        toast({
          title: 'Sign-in Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    completeSignIn();
  }, [navigate, toast]);

  const handleBackToAuth = () => {
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
            <CardTitle>Completing Sign-in</CardTitle>
            <CardDescription>Please wait while we verify your email link...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-green-900">Sign-in Successful!</CardTitle>
            <CardDescription>You have been signed in successfully. Redirecting to dashboard...</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-green-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-900">Sign-in Failed</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-red-600">
              The sign-in link may have expired or been used already. Please request a new one.
            </div>
            <Button 
              onClick={handleBackToAuth} 
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign-in
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default EmailLinkCompletion;