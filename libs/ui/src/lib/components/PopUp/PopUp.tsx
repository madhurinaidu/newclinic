'use client';
import { useEffect, useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  rect?: { clientX?: number; clientY?: number };
  targetElement?: HTMLElement | null;
}

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  targetElement,
  rect,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (targetElement && isOpen) {
      let rect = targetElement.getBoundingClientRect();
      if (rect) {
        rect = {
          ...rect,
        };
      }
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const popupWidth = 200; // minimum width from className min-w-[200px]
      const popupHeight = 200; // approximate height, adjust as needed
      const padding = 8; // padding from edges

      // Calculate left position
      let leftPos = rect.left + window.scrollX;
      if (leftPos + popupWidth > windowWidth) {
        leftPos = windowWidth - popupWidth - padding;
      }

      // Calculate top position
      let topPos = rect.bottom + window.scrollY + padding;

      // If popup would overflow bottom of window, position it above the target
      if (rect.bottom + popupHeight + padding > windowHeight) {
        topPos = rect.top + window.scrollY - popupHeight - padding;
      }

      setPosition({
        top: topPos,
        left: leftPos,
      });
    }
  }, [targetElement, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        className={`z-50 min-w-[200px] rounded-lg bg-white p-4 shadow-lg
          ${isOpen ? 'animate-popIn' : 'animate-popOut'}
          origin-top-left`}
      >
        {children}
      </div>
    </>
  );
};
