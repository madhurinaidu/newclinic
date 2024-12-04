'use client';

import { Button, Input } from '@libs/ui';
import { Phone, Lock } from '@phosphor-icons/react/dist/ssr';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ phoneNumber: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ phoneNumber: '', password: '', general: '' });
    setIsLoading(true);

    // Input validation
    if (!phoneNumber) {
      setError((prev) => ({ ...prev, phoneNumber: 'Phone number is required' }));
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: 'Password is required' }));
      setIsLoading(false);
      return;
    }

    try {
      const response = await signIn('credentials', {
        email:phoneNumber,
        password,
        redirect: false,
      });

      if (response?.error) {
        setError((prev) => ({ ...prev, general: 'Invalid credentials' }));
        return;
      }

      router.push('/search');
    } catch (error) {
      setError((prev) => ({ ...prev, general: 'An error occurred during login' }));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </label>
          <div className="mt-2 relative">
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="phoneNumber"
              required
              value={phoneNumber}
              leftIcon={<Phone size={20} />}
              size={'lg'}
              fullWidth
              onChange={(e) => setPhoneNumber(e.target.value)}
              className=" dark:bg-gray-800 "
              placeholder="Enter your Phone Number"
            />
          </div>
          {error.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{error.phoneNumber}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="mt-2 relative">
            <Input
              id="password"
              size={'lg'}
              name="password"
              leftIcon={<Lock size={20} />}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" dark:bg-gray-800 "
              fullWidth
              placeholder="Enter your password"
            />
          </div>
          {error.password && (
            <p className="mt-1 text-sm text-red-600">{error.password}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Forgot password?
        </Link>
      </div>

      <div>
      <Button fullWidth type="submit" variant="filled" size="lg" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
      {error.general && (
        <p className="mt-3 text-center text-sm text-red-600">{error.general}</p>
      )}

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
