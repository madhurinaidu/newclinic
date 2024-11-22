'use client';

import { User } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '../Container/Container';
import { Dropdown } from '../DropDown/Dropdown';
import { DropdownItem } from '../DropDown/DropdownItem';
import { ThemeToggle } from '../Theme/ThemeSwitch';

export interface NavItem {
  label: string;
  href: string;
}

export interface UserMenuItemsProps {
  label: string;
  href?: string;
  trigerType?: 'button' | 'link';
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface UserMenuProps {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
  items?: UserMenuItemsProps[];
}

interface AppHeaderProps {
  navItems?: NavItem[];
  userMenu?: UserMenuProps;
  logo?: React.ReactNode;
  hideForPaths?: string[];
}

export const AppHeader = ({
  navItems,
  userMenu,
  logo,
  hideForPaths = [],
}: AppHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (hideForPaths.includes(pathname)) {
    return null;
  }

  return (
    <div>
      <div className="h-16"></div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            {logo && (
              <div className="flex-shrink-0">
                <Link href="/">{logo}</Link>
              </div>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/50'
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center mr-3">
                <ThemeToggle />
              </div>
              {userMenu?.user ? (
                <div className="relative">
                  <Dropdown
                    trigger={
                      <button
                        onClick={() =>
                          setIsUserDropdownOpen(!isUserDropdownOpen)
                        }
                        className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User />
                        {/* <Image
                      src={userMenu.user.image}
                      alt={userMenu.user.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    /> */}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {userMenu.user.name}
                        </span>
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    }
                  >
                    {userMenu?.items?.map((item) => (
                      <DropdownItem
                        as={item.trigerType === 'link' ? Link : 'button'}
                        key={item.label}
                        leftIcon={item.icon}
                        label={item.label}
                        {...(item.trigerType === 'link'
                          ? { href: item.href }
                          : {})}
                        {...(item.onClick ? { onClick: item.onClick } : {})}
                      />
                    ))}
                  </Dropdown>
                </div>
              ) : (
                <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600">
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu with user options */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {userMenu?.user ? (
                <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <Image
                      src={userMenu?.user?.image || ''}
                      alt={userMenu?.user?.name || ''}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {userMenu.user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userMenu.user.email}
                      </p>
                    </div>
                  </div>
                  {userMenu?.items?.map((item) => (
                    <div key={item.label}>
                      {item.trigerType === 'link' ? (
                        <Link
                          key={item.label}
                          href={item.href || ''}
                          className="block mt-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={item.label}
                          onClick={item.onClick}
                          className="block mt-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <button className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
};
