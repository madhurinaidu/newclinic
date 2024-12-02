import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  padding?: boolean;
  isPatient?: boolean;
}

export function Container({
  children,
  className = '',
  maxWidth,
  padding = true,
  isPatient = false,
}: ContainerProps) {
  if (isPatient) {
    maxWidth = 'xl';
  } else {
    maxWidth = maxWidth || '3xl';
  }
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '3xl': 'max-w-screen-3xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto w-full ${maxWidthClasses[maxWidth]} ${
        padding ? 'px-3 sm:px-6 lg:px-8' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
