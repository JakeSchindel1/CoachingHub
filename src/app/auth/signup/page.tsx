'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, UserIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { SignUpData, UserRole } from '@/types';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { auth, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    name: '',
    role: (searchParams.get('role') as UserRole) || 'athlete',
  });

  // Handle redirect after successful authentication
  useEffect(() => {
    if (auth.user && !auth.loading) {
      router.push(auth.user.role === 'coach' ? '/coach/dashboard' : '/athlete/dashboard');
    }
  }, [auth.user, auth.loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signUp(formData);
      // Redirect will be handled by useEffect
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  // Show loading while checking auth
  if (auth.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If already authenticated, don't show the form (redirect happens in useEffect)
  if (auth.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">CoachingApp</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Join thousands of coaches and athletes</p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">I am a...</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleRoleSelect('coach')}
              className={`relative p-4 border-2 rounded-lg transition-all ${
                formData.role === 'coach'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <UserIcon className={`h-8 w-8 mx-auto mb-2 ${
                  formData.role === 'coach' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  formData.role === 'coach' ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  Coach
                </span>
              </div>
              {formData.role === 'coach' && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-600 rounded-full"></div>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('athlete')}
              className={`relative p-4 border-2 rounded-lg transition-all ${
                formData.role === 'athlete'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <TrophyIcon className={`h-8 w-8 mx-auto mb-2 ${
                  formData.role === 'athlete' ? 'text-emerald-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  formData.role === 'athlete' ? 'text-emerald-900' : 'text-gray-900'
                }`}>
                  Athlete
                </span>
              </div>
              {formData.role === 'athlete' && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-600 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Sign Up Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password (min. 8 characters)"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {auth.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{auth.error}</p>
            </div>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={auth.loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              formData.role === 'coach'
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
            }`}
          >
            {auth.loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating account...
              </div>
            ) : (
              `Create ${formData.role} account`
            )}
          </button>

          {/* Terms and Privacy */}
          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 