'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  navItems: NavItem[];
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen md:mt-6 sm:mt-2">
      {/* Sidebar Navigation */}
      <nav className="md:w-56 md:min-h-screen">
        {/* Mobile Tabs */}
        <div className="md:hidden flex overflow-x-auto dark:border-gray-700">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={twMerge(
                'flex items-center p-4 space-x-2 whitespace-nowrap',
                pathname === item.href
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-300'
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:flex-col h-full">
          {/* <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Navigation
            </h2>
          </div> */}
          <div className="flex-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={twMerge(
                  'flex items-center p-3 px-4 space-x-3  rounded-xl',
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/50 '
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-0 sm:p-4 ">{children}</main>
    </div>
  );
};

export default Sidebar;
