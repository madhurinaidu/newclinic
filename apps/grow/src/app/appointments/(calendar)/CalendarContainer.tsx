'use client';

import { Calendar } from '@libs/ui';

export default function CalendarContainer({
  appointmentData = [],
}: {
  appointmentData: any;
}) {
  const events = appointmentData?.data?.map((data: any) => {
    // Create new Date objects for start and end times
    const startTime = new Date(data.StartTime);
    const endTime = new Date(data.EndTime);

    // Add 5 hours and 30 minutes to both start and end times
    startTime.setHours(startTime.getHours() - 5);
    startTime.setMinutes(startTime.getMinutes() - 30);

    endTime.setHours(endTime.getHours() - 5);
    endTime.setMinutes(endTime.getMinutes() - 30);

    return {
      ...data,
      id: data.id,
      title: data.Title,
      start: startTime,
      end: endTime,
    };
  });

  console.log('appointmentData', events);

  return (
    <Calendar
      appointmentData={appointmentData}
      events={events}
      callUrl={'/call'}
    />
  );
}




