'use client';

import { Calendar } from '@grow/ui';

export default function CalendarContainer({
  appointmentData = [],
}: {
  appointmentData: any;
}) {
  const events = appointmentData?.data?.map((data: any) => ({
    ...data,
    id: data.id,
    title: data.Title,
    start: new Date(data.StartTime),
    end: new Date(data.EndTime),
  }));
  console.log('appointmentData', events);
  return (
    <Calendar
      appointmentData={appointmentData}
      events={events}
      callUrl={'/call'}
    />
  );
}
