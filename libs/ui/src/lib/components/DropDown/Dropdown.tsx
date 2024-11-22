'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  openOnHover?: boolean;
}

export const Dropdown = ({
  trigger,
  children,
  openOnHover = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // Add states for dropdown position
  const [verticalPosition, setVerticalPosition] = useState<'bottom' | 'top'>(
    'bottom'
  );
  const [horizontalPosition, setHorizontalPosition] = useState<
    'right' | 'left'
  >('right');
  // Add state for trigger width
  const [triggerWidth, setTriggerWidth] = useState(0);

  // Enhanced position check function
  const checkPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    const triggerElement = event.currentTarget;
    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Store trigger width
    setTriggerWidth(triggerRect.width);

    // Check vertical space
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    // Check horizontal space
    const spaceRight = viewportWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;

    // Set vertical position
    if (spaceBelow < 320 && spaceAbove > spaceBelow) {
      setVerticalPosition('top');
    } else {
      setVerticalPosition('bottom');
    }

    // Set horizontal position
    if (spaceRight < 224) {
      // 224px = 14rem (w-56)
      setHorizontalPosition('left');
    } else {
      setHorizontalPosition('right');
    }

    setIsOpen(!isOpen);
  };

  // Add hover handlers
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      checkPosition(event);
    }
  };

  const handleMouseLeave = () => {
    if (openOnHover) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <div
        onClick={!openOnHover ? checkPosition : undefined}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - only show if not in hover mode */}
            {!openOnHover && (
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Dropdown Menu */}
            <motion.div
              initial={{
                opacity: 0,
                y: verticalPosition === 'bottom' ? -5 : 5,
                x: horizontalPosition === 'right' ? -5 : 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
              }}
              exit={{
                opacity: 0,
                y: verticalPosition === 'bottom' ? -5 : 5,
                x: horizontalPosition === 'right' ? -5 : 5,
              }}
              transition={{ duration: 0.2 }}
              className={`absolute z-40 min-w-full rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                ${
                  verticalPosition === 'bottom'
                    ? openOnHover
                      ? 'mt-0'
                      : 'mt-2'
                    : 'bottom-full mb-2'
                }
                ${
                  horizontalPosition === 'right'
                    ? 'right-0'
                    : 'left-0 -translate-x-[100%]'
                }
                origin-${verticalPosition}-${horizontalPosition}`}
            >
              <div className="py-1">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
