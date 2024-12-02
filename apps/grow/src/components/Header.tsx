'use client';
import { AppHeader, GrowLogo } from '@libs/ui';
import { User } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';

const navigationItems = [
  { label: 'Appointments', href: '/appointments' },
  { label: 'Leads', href: '/leads' },
  { label: 'Questions', href: '/questions' },
  { label: 'Reviews', href: '/reviews' },
  // Add any other navigation items you need
];

export default function Header() {
  const { data: session } = useSession();
  return (
    <AppHeader
      logo={<GrowLogo animate={false} />}
      hideForPaths={['/login']}
      navItems={navigationItems}
      userMenu={{
        user: {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          // image: session?.user?.image,
        },
        items: [
          {
            label: 'Profile',
            href: '/profile',
            trigerType: 'link',
            icon: <User />,
          },
        ],
      }}
    />
  );
}
