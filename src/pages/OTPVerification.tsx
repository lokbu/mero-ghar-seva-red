import OTPVerification from '@/components/OTPVerification';

const OTPVerificationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔐 OTP Verification
          </h1>
          <p className="text-gray-600">
            Secure and fast verification for Nepal
          </p>
        </div>
        <OTPVerification />
      </div>
    </div>
  );
};

export default OTPVerificationPage;