'use client';
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  ThemeToggle,
} from '@libs/ui';
import { BookBookmark, CaretDown, Gear } from '@phosphor-icons/react';
import { User } from '@phosphor-icons/react/dist/ssr';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react'; // Import signOut from next-auth


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(session);

  const navigation = [
    { name: 'Find Doctors', href: '/search' },
    { name: 'Video Consultation', href: '/video-consult' },
    // { name: 'About', href: '/about' },
    // { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full  ${isAtTop ? 'bg-transparent' : 'shadow-md bg-white dark:bg-gray-800'
        } z-50`}
    >
      <Container isPatient>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              style={{ letterSpacing: '-0.05rem', fontWeight: 800 }}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              Clinic<span className="text-blue-500">Spots</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 h-full grow ml-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{ fontSize: 16 }}
                className={`relative after:content-[''] after:absolute after:bottom-0  after:h-[4px]  after:w-0 hover:after:w-12 after:rounded-t-lg after:transition-all  px-4 py-2 h-full flex items-center justify-center text-center font-medium transition-colors after:bg-blue-500  ${pathname === item.href
                    ? 'after:bg-blue-500 after:w-12'
                    : ' text-gray-500 dark:text-gray-300 hover:text-gray-700'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Icon */}
          <div className="flex items-center">
            <ThemeToggle />
            {session?.user && (
              <Dropdown
                minWidth={'180px'}
                trigger={
                  <Button
                    color="inherit"
                    rounded
                    leftIcon={<User />}
                    rightIcon={<CaretDown />}
                    className="dark:hover:bg-gray-700"
                  >
                    {session?.user?.name}
                  </Button>
                }
              >
                <DropdownItem label="Profile" leftIcon={<User />} />
                {/* <DropdownItem
                  label="My Appointments"
                  onClick={() => router.push('/dashboard/appointments')}
                  leftIcon={<BookBookmark />}
                /> */}
                <DropdownItem label="Settings" leftIcon={<Gear />} />
                <DropdownItem
                  label="Logout"
                  leftIcon={<User />} // You can replace with a logout icon
                  onClick={() => {
                    signOut({ callbackUrl: '/login' }); // Clear session and navigate to login page
                  }}
                />
              </Dropdown>)}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
