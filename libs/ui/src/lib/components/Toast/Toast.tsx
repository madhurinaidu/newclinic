'use client';

import { createContext, useContext, useState } from 'react';
import './style.css';

// Define the type for the Toast context
type ToastContextType = {
  open: ({
    message,
    variant,
  }: {
    message: string;
    variant: 'success' | 'error' | 'info' | 'warning' | 'primary';
  }) => void;
};

// Create Toast Context with the defined type
const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    variant: 'success' | 'error' | 'info' | 'warning' | 'primary';
    isOpen: boolean;
  }>({
    message: '',
    variant: 'success',
    isOpen: false,
  });

  const open = ({
    message,
    variant,
  }: {
    message: string;
    variant: 'success' | 'error' | 'info' | 'warning' | 'primary';
  }) => {
    setToast({ message, variant, isOpen: true });
    setTimeout(() => setToast({ ...toast, isOpen: false }), 5000);
  };

  return (
    <ToastContext.Provider value={{ open }}>
      {children}
      {toast.isOpen && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-2 px-4 rounded-sm shadow-md z-50 transition-opacity duration-300 ease-in-out opacity-100 ${getToastClasses(
            toast.variant
          )} animate-fade-in`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Function to get Tailwind classes based on variant
const getToastClasses = (
  variant: 'success' | 'error' | 'info' | 'warning' | 'primary'
) => {
  switch (variant) {
    case 'success':
      return 'bg-green-500 text-white';
    case 'error':
      return 'bg-red-500 text-white';
    case 'info':
      return 'bg-blue-500 text-white';
    case 'warning':
      return 'bg-yellow-500 text-black';
    case 'primary':
      return 'bg-indigo-500 text-white';
    default:
      return '';
  }
};

export default ToastProvider;
