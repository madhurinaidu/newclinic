'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  'flex items-center border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm px-3',
        md: 'h-10 text-base px-4',
        lg: 'h-12 text-lg px-6',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      color: {
        primary:
          'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
        info: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
        warning:
          'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
        error:
          'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600 dark:bg-gray-700 dark:text-white',
        success:
          'border-green-300 focus:border-green-500 focus:ring-green-500 dark:border-green-600 dark:bg-gray-700 dark:text-white',
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: false,
      color: 'primary',
      rounded: false,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
}

export const Input = ({
  className,
  size,
  fullWidth,
  color,
  rounded,
  leftIcon,
  rightIcon,
  helperText,
  ...props
}: InputProps) => {
  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            inputVariants({ size, fullWidth, color, rounded }),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && (
        <p
          className={cn(
            'text-sm',
            color === 'error' && 'text-red-500 dark:text-red-400',
            color === 'success' && 'text-green-500 dark:text-green-400',
            color === 'warning' && 'text-yellow-500 dark:text-yellow-400',
            color === 'info' && 'text-blue-500 dark:text-blue-400',
            color === 'primary' && 'text-gray-500 dark:text-gray-400'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
