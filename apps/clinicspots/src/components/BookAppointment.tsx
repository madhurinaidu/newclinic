'use client';

import { API } from '@app/config';
import { Button, DateTabs, Modal, useToast } from '@libs/ui';
import { PersonSimpleWalk, VideoCamera } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const doctor = {
  name: 'Dr Satish',
  email: 'satish1asapu@gmail.com',
  id: '6724590987ee2165561bc050',
};

const daySlots = {
  morning: [
    {
      label: '10:00 AM',
      key: '10:00 AM',
      hour: 10,
      minute: 0,
      isSlotAvailable: true,
    },
    {
      label: '10:30 AM',
      key: '10:30 AM',
      hour: 10,
      minute: 30,
      isSlotAvailable: true,
    },
    {
      label: '11:00 AM',
      key: '11:00 AM',
      hour: 11,
      minute: 0,
      isSlotAvailable: true,
    },
    {
      label: '11:30 AM',
      key: '11:30 AM',
      hour: 11,
      minute: 30,
      isSlotAvailable: true,
    },
  ],
  afternoon: [
    {
      label: '12:00 PM',
      key: '12:00 PM',
      hour: 12,
      minute: 0,
      isSlotAvailable: true,
    },
    {
      label: '12:30 PM',
      key: '12:30 PM',
      hour: 12,
      minute: 30,
      isSlotAvailable: true,
    },
    {
      label: '1:00 PM',
      key: '1:00 PM',
      hour: 13,
      minute: 0,
      isSlotAvailable: true,
    },
  ],
  evening: [
    {
      label: '5:00 PM',
      key: '5:00 PM',
      hour: 17,
      minute: 0,
      isSlotAvailable: true,
    },
    {
      label: '5:30 PM',
      key: '5:30 PM',
      hour: 17,
      minute: 30,
      isSlotAvailable: true,
    },
    {
      label: '6:00 PM',
      key: '6:00 PM',
      hour: 18,
      minute: 0,
      isSlotAvailable: true,
    },
    {
      label: '6:30 PM',
      key: '6:30 PM',
      hour: 18,
      minute: 30,
      isSlotAvailable: true,
    },
  ],
};

const weekSlots = [
  {
    label: 'Today',
    key: 'today',
    date: dayjs().toDate(),
    isSlotAvailable: true,
    subText: '5 Available',
  },
  {
    label: 'Tomorrow',
    key: 'tomorrow',
    date: dayjs().add(1, 'day').toDate(),
    isSlotAvailable: true,
    subText: '12 Available',
  },
  {
    label: `${dayjs().add(2, 'day').format('ddd, D MMM')}`,
    key: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    date: dayjs().add(2, 'day').toDate(),
    isSlotAvailable: true,
    subText: '12 Available',
  },
  {
    label: `${dayjs().add(3, 'day').format('ddd, D MMM')}`,
    key: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    date: dayjs().add(3, 'day').toDate(),
    isSlotAvailable: true,
    subText: '12 Available',
  },
  {
    label: `${dayjs().add(4, 'day').format('ddd, D MMM')}`,
    key: dayjs().add(4, 'day').format('YYYY-MM-DD'),
    date: dayjs().add(4, 'day').toDate(),
    isSlotAvailable: true,
    subText: '12 Available',
  },
];

export default function BookAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const session = useSession();
  const router = useRouter();
  const bookAppointment = () => {
    if (session.status === 'unauthenticated') {
      router.push('/login');
    } else {
      setIsOpen(true);
    }
  };
  const bookSlot = (startTime: string, endTime: string) => {
    console.log('bookSlot', startTime, endTime);
    fetch(API.bookAppointment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.data?.user?.accessToken}`,
      },
      body: JSON.stringify({
        repeats: '',
        location: 'vijayawada',
        meetingToBeVerified: true,
        title: 'Demo11',
        startTime: startTime,
        endTime: endTime,
        participants: {
          Patients: {
            name: session.data?.user?.name,
            statusId: 1,
            userId: session.data?.user?.id,
          },
          Doctor: {
            emailid: doctor.email,
            name: doctor.name,
            userId: doctor.id,
          },
        },
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        const data = await res.json();
        const json = {
          MeetingID: data.data[0].MeetingID,
          MeetingRoomID: data.data[0].MeetingRoomID,
          MeetingStatusID: data.data[0].MeetingStatusID,
          MeetingToBeVerified: data.data[0].MeetingToBeVerified,
          endTime: endTime,
          patientName: session.data?.user?.name,
          startTime: startTime,
        };
        fetch(`${API.doctorList}/${doctor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.data?.user?.accessToken}`,
          },
          body: JSON.stringify(json),
        }).then((res) => {
          if (res.status === 200) {
            setIsOpen(false);
            router.push('/dashboard/appointments');
            toast?.open({
              message: 'Appointment booked successfully',
              variant: 'success',
            });
          }
        });
      }
    });
  };
  return (
    <>
      <Button
        variant="filled"
        color="primary"
        fullWidth
        leftIcon={<PersonSimpleWalk />}
        onClick={bookAppointment}
      >
        Book Clinic Visit
      </Button>
      <Modal
        maxWidth="sm:max-w-2xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Book an appointment for Consultation"
      >
        <div className="flex flex-row justify-center">
          <ul className="grid w-full gap-6 md:grid-cols-2 max-w-md mb-4">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                className="hidden peer"
                required
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">In Clinic</div>
                  <div className="w-full text-xs">Visit the clinic</div>
                </div>
                <PersonSimpleWalk weight="fill" size={30} />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-big"
                defaultChecked
                name="hosting"
                value="hosting-big"
                className="hidden peer"
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">
                    Video Consult
                  </div>
                  <div className="w-full text-xs">Consult from home</div>
                </div>
                <VideoCamera weight="fill" size={30} />
              </label>
            </li>
          </ul>
        </div>
        <div>
          <DateTabs
            tabs={weekSlots}
            daySlots={daySlots}
            onSlotSelect={bookSlot}
          />
        </div>
      </Modal>
    </>
  );
}
