'use client';

import { API } from '@app/config';
import { IAppointment } from '@app/types/Doctor';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AppointmentItem from './AppointmentItem';

export default function Appointments() {
  const session = useSession();
  const token = session.data?.user.accessToken;
  const [futureAppointments, setFutureAppointments] = useState<IAppointment[]>(
    []
  );
  //   const [appointments, setAppointments] = useState<IAppointment[]>([]);
  useEffect(() => {
    if (token)
      fetch(
        `${
          API.appointmentsFilter
        }?start=${new Date().toISOString()}&end=${new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ).toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const futureAppointments = data?.data?.filter(
            (appointment: IAppointment) =>
              dayjs(appointment?.StartTime).isAfter(dayjs())
          );
          //   const appointments = data?.data?.filter((appointment: IAppointment) =>
          //     dayjs(appointment?.StartTime).isBefore(dayjs())
          //   );

          setFutureAppointments(futureAppointments);
          //   setAppointments(futureAppointments);
        });
  }, [token]);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">Upcoming Appointments</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {futureAppointments.map((appointment) => (
          <AppointmentItem
            key={appointment._id}
            appointment={appointment}
            isCard
          />
        ))}
      </div>
      <div className="text-lg font-bold mt-5">Recent Appointments</div>
      {futureAppointments.map((appointment) => (
        <AppointmentItem
          key={appointment._id}
          appointment={appointment}
          isClosed
        />
      ))}
    </div>
  );
}
