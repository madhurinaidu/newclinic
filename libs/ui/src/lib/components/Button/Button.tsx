'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from './../../utils/cn'; // Utility for merging class names

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  color?:
    | 'primary'
    | 'info'
    | 'warning'
    | 'error'
    | 'success'
    | 'inherit'
    | 'light';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isIconButton?: boolean;
  rounded?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'text',
      size = 'md',
      color = 'primary',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      isIconButton = false,
      rounded = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      text: {
        primary:
          'bg-transparent hover:bg-gray-100 text-primary dark:text-primary-darkforeground dark:hover:bg-gray-800',
        info: 'bg-transparent hover:bg-gray-100 text-blue-600 dark:text-blue-400 dark:hover:bg-gray-800',
        warning:
          'bg-transparent hover:bg-gray-100 text-yellow-600 dark:text-yellow-400 dark:hover:bg-gray-800',
        error:
          'bg-transparent hover:bg-gray-100 text-red-600 dark:text-red-400 dark:hover:bg-gray-800',
        success:
          'bg-transparent hover:bg-gray-100 text-green-600 dark:text-green-400 dark:hover:bg-gray-800',
        inherit:
          'bg-transparent hover:bg-gray-100 text-inherit dark:hover:bg-gray-800',
        light:
          'text-primary bg-primary/10 z-10 dark:dark:bg-blue-900/50 dark:ring-primary-400 dark:text-white hover:ring-1 hover:ring-primary',
      },
      filled: {
        primary:
          'bg-primary text-white hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90',
        info: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
        warning:
          'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500',
        error:
          'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
        success:
          'bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
        inherit:
          'bg-current text-inherit hover:bg-current/90 dark:hover:bg-current/90',
        light:
          'text-primary bg-primary/10 z-10 ring-1 ring-primary dark:dark:bg-blue-900/50 dark:ring-primary-400 dark:text-white hover:bg-primary hover:text-white',
      },
      outlined: {
        primary:
          'border border-primary bg-transparent text-primary hover:bg-primary/10 dark:border-primary-darkforeground dark:text-primary-darkforeground dark:hover:bg-primary-dark/10',
        info: 'border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20',
        warning:
          'border border-yellow-500 bg-transparent text-yellow-600 hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/20',
        error:
          'border border-red-600 bg-transparent text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20',
        success:
          'border border-green-600 bg-transparent text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20',
        inherit:
          'border border-current bg-transparent text-inherit hover:bg-current/10 dark:hover:bg-current/20',
        light:
          'text-primary bg-primary/10 z-10 ring-1 ring-primary dark:dark:bg-blue-900/50 dark:ring-primary-400 dark:text-white ring-1 ring-primary hover:bg-primary hover:text-white',
      },
    };

    const sizes = {
      sm: isIconButton ? 'h-9 w-9' : 'h-9 px-3 text-sm',
      md: isIconButton ? 'h-10 w-10' : 'h-10 px-4 py-2',
      lg: isIconButton ? 'h-11 w-11' : 'h-11 px-8',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant][color],
          sizes[size],
          'relative',
          rounded ? 'rounded-full' : 'rounded-md',
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        )}
        <span
          className={cn(
            'inline-flex items-center gap-2',
            isLoading && 'invisible'
          )}
        >
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
