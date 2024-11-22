import { GrowLogo } from '@grow/ui';
import {
  AppleLogo,
  FacebookLogo,
  GoogleLogo,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-14">
          <GrowLogo scaleIn />
        </div>
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-3xl sm:px-10">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Doctor Login
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Hey, Enter your details to get sign in to your account
          </p>

          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or Sign in with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <GoogleLogo className="h-5 w-5 text-red-600" weight="fill" />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <AppleLogo
                  className="h-5 w-5 text-gray-900 dark:text-white"
                  weight="fill"
                />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <FacebookLogo className="h-5 w-5 text-blue-600" weight="fill" />
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              Request Now
            </Link>
          </p>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Copyright @Grow 2024 |{' '}
          <Link href="/privacy" className="hover:text-indigo-500">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
}
