'use client';

import { Button, Input } from '@libs/ui';
import { At, Lock } from '@phosphor-icons/react/dist/ssr';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setError('Invalid credentials');
        return;
      }

      router.push('/search');
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <div className="mt-2 relative">
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              leftIcon={<At size={20} />}
              size={'lg'}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              className=" dark:bg-gray-800 "
              placeholder="Enter your email"
            />
          </div>
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
        <Button fullWidth type="submit" variant="filled" size="lg">
          Sign in
        </Button>
      </div>

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
