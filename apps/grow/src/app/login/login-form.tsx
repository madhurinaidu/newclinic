'use client';

import { Button, Input } from '@grow/ui';
import { Eye, Lock, User } from '@phosphor-icons/react/dist/ssr';
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

      router.push('/appointments');
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Input
          fullWidth
          required
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          size={'lg'}
          leftIcon={<User />}
          placeholder="Enter Email / Phone No"
        />
      </div>

      <div className="relative">
        <Input
          fullWidth
          size={'lg'}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock />}
          rightIcon={
            <Button isIconButton rounded color="inherit">
              <Eye />
            </Button>
          }
          type="password"
          placeholder="Passcode"
        />
      </div>

      <div className="text-sm">
        <Link
          href="/forgot-password"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
        >
          Having trouble in sign in?
        </Link>
      </div>

      <Button
        fullWidth
        variant="filled"
        size="lg"
        type="submit"
        isLoading={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </form>
  );
}
