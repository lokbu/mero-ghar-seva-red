
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import AuthPage from '@/components/auth/AuthPage';
import EmailLinkCompletion from '@/components/auth/EmailLinkCompletion';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Dashboard from '@/components/Dashboard';
import Login from '@/pages/Login';
import Services from '@/pages/Services';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Default redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Login page */}
            <Route path="/login" element={<Login />} />
            
            {/* Services page */}
            <Route path="/services" element={<Services />} />
            
            {/* Authentication page */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Email link completion */}
            <Route path="/complete-signin" element={<EmailLinkCompletion />} />
            
            {/* Protected dashboard */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
