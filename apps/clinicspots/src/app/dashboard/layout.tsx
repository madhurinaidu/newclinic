import { Container, Sidebar } from '@libs/ui';
import {
  AddressBookTabs,
  Calendar as CalendarIcon,
  GearSix,
  ListChecks,
} from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const navItems = [
  {
    icon: <CalendarIcon className="w-5 h-5" />, // Use your preferred icon component
    label: 'Appointments',
    href: '/dashboard/appointments',
  },
  {
    icon: <AddressBookTabs className="w-5 h-5" />,
    label: 'Medical Records',
    href: '/dashboard/medical-records',
  },
  {
    icon: <GearSix className="w-5 h-5" />,
    label: 'Settings',
    href: '/dashboard/settings',
  },
  {
    icon: <ListChecks className="w-5 h-5" />,
    label: 'Lab Results',
    href: '/dashboard/lab-results',
  },
  // Add more nav items as needed
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Container isPatient className="pt-1">
        <Sidebar navItems={navItems}>{children}</Sidebar>
      </Container>
    </div>
  );
}
