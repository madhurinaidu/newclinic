import { PageBanner } from '@app/components';
import LeftImage from './LeftImage';
import LoginForm from './login-form';
import './style.css';

export default function LoginPage() {
  return (
    <PageBanner style={{ paddingTop: 0 }}>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-[url('/medical-bg-pattern.png')] opacity-5"></div>
          <div className="relative w-full h-full flex flex-col items-center justify-center p-12">
            <div className="w-full max-w-md">
              <LeftImage />
              <div className="mt-8 space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Your Health, Our Priority
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Book appointments with top healthcare professionals in your
                  area. Quick, easy, and secure.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      24/7 Available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Secure Platform
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-white dark:bg-gray-900">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="inline-block p-2 bg-blue-50 dark:bg-blue-900/30 rounded-2xl mb-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Sign in to access your patient dashboard
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </PageBanner>
  );
}
