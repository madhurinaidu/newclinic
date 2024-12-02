import { Container, Sidebar } from '@libs/ui';
import { Calendar as CalendarIcon, List } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const navItems = [
  {
    icon: <CalendarIcon className="w-5 h-5" />, // Use your preferred icon component
    label: 'Calender',
    href: '/appointments',
  },
  {
    icon: <List className="w-5 h-5" />,
    label: 'List',
    href: '/appointments/list',
  },
  // Add more nav items as needed
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Sidebar navItems={navItems}>{children}</Sidebar>
    </Container>
  );
}
