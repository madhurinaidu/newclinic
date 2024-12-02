'use client';

interface DropdownItemProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightText?: string;
  onClick?: () => void;
  as?: React.ElementType;
  href?: string;
}

export const DropdownItem = ({
  label,
  leftIcon,
  href,
  rightText,
  onClick,
  as: Component = 'div',
  ...props
}: DropdownItemProps) => {
  return (
    <Component
      {...(href ? { href } : {})}
      {...(onClick ? { onClick } : {})}
      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className="flex-grow">{label}</span>
      {rightText && (
        <span className="ml-2 text-xs text-gray-400">{rightText}</span>
      )}
    </Component>
  );
};
