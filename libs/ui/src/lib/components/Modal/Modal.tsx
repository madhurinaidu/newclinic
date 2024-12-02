'use client';

import { X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import Button from '../Button/Button';
import './style.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  maxWidth,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-white dark:bg-black"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div
              className={cn(
                'relative w-full h-full bg-white dark:bg-gray-800 sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:rounded-lg sm:m-6 modal-shadow',
                maxWidth ? maxWidth : ''
              )}
            >
              {/* Header */}

              {title ? (
                <div className="sticky sm:rounded-t-lg top-0 flex items-center justify-between px-4 py-3 sm:px-6 bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <Button onClick={onClose} isIconButton rounded>
                    <X
                      size={24}
                      weight="regular"
                      className="text-gray-600 dark:text-white"
                    />
                  </Button>
                </div>
              ) : (
                <div className="ml-auto absolute right-2 top-2">
                  <Button onClick={onClose} isIconButton rounded>
                    <X
                      size={24}
                      weight="regular"
                      className="text-gray-600 dark:text-white"
                    />
                  </Button>
                </div>
              )}

              {/* Content */}
              <div
                className={cn(
                  'px-4 py-4 sm:px-6 overflow-y-auto h-[calc(100vh-64px)] sm:h-auto'
                )}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
