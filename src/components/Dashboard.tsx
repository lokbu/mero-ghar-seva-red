import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Phone, Mail, Shield, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Signed Out',
        description: 'You have been signed out successfully.',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getAuthenticationMethod = () => {
    if (user?.phoneNumber) {
      return { method: 'Phone', icon: Phone, value: user.phoneNumber };
    } else if (user?.email) {
      return { method: 'Email', icon: Mail, value: user.email };
    }
    return { method: 'Unknown', icon: Shield, value: 'N/A' };
  };

  const authMethod = getAuthenticationMethod();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to your secure account</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || 
                     user?.email?.charAt(0) || 
                     user?.phoneNumber?.charAt(1) || 'U'}
                  </AvatarFallback>
                </Avatar>
                User Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">User ID</span>
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {user?.uid.slice(0, 8)}...
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Authentication</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <authMethod.icon className="h-3 w-3" />
                    {authMethod.method}
                  </Badge>
                </div>

                {user?.phoneNumber && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Phone</span>
                    <span className="text-sm">{user.phoneNumber}</span>
                  </div>
                )}

                {user?.email && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Email</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Email Verified</span>
                  <Badge variant={user?.emailVerified ? "default" : "secondary"}>
                    {user?.emailVerified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Session Information
              </CardTitle>
              <CardDescription>Your current session details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Created</span>
                  <span className="text-sm">
                    {user?.metadata.creationTime ? 
                      new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Last Sign In</span>
                  <span className="text-sm">
                    {user?.metadata.lastSignInTime ? 
                      new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <Badge variant="default" className="bg-green-500">
                    Active
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your session is secured with Firebase Authentication. 
                  You were authenticated using {authMethod.method.toLowerCase()} 
                  verification with OTP technology.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Features
              </CardTitle>
              <CardDescription>Security measures protecting your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-medium text-green-900">OTP Verification</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Secure one-time password authentication
                  </p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium text-blue-900">Email Link Auth</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Passwordless email authentication
                  </p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-medium text-purple-900">Firebase Security</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    Enterprise-grade security infrastructure
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;