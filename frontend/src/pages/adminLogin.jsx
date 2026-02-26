import { useState } from 'react';
import { useAdminLogin, useAdminOTPVerify } from '../hooks/adminHooks';

const AdminLogin = () => {
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    // React Query hooks
    const loginMutation = useAdminLogin();
    const otpVerifyMutation = useAdminOTPVerify();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        loginMutation.mutate(email, {
            onSuccess: (response) => {
                setStep('otp');
            }
        });
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        if (!otp) return;

        otpVerifyMutation.mutate({ email, otp });
    };

    const goBack = () => {
        setStep('email');
        setOtp('');
        loginMutation.reset();
        otpVerifyMutation.reset();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 'email' ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
                    </p>
                </div>

                {(loginMutation.isError || otpVerifyMutation.isError) && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {loginMutation.error?.response?.data?.message ||
                            otpVerifyMutation.error?.response?.data?.message ||
                            'An error occurred'}
                    </div>
                )}

                {loginMutation.isSuccess && step === 'otp' && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        {loginMutation.data?.data?.message || 'OTP sent successfully'}
                    </div>
                )}

                {step === 'email' ? (
                    <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Admin email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loginMutation.isPending}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loginMutation.isPending || !email}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {loginMutation.isPending ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleOTPSubmit}>
                        <div>
                            <label htmlFor="otp" className="sr-only">
                                OTP Code
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                maxLength="6"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center tracking-widest"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                disabled={otpVerifyMutation.isPending}
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={goBack}
                                disabled={otpVerifyMutation.isPending}
                                className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={otpVerifyMutation.isPending || !otp}
                                className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {otpVerifyMutation.isPending ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        OTP is valid for 5 minutes
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;