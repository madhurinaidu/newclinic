import {
  GpsFix,
  HandGrabbing,
  PhoneTransfer,
  ThumbsDown,
  ThumbsUp,
  Users,
} from '@phosphor-icons/react';
import dayjs from 'dayjs';
import Button from '../Button/Button';
import { Event } from './schema';

export default function EventDetail({
  event,
  callUrl,
}: {
  event: Event;
  callUrl: string;
}) {
  // Subtract 5 hours and 30 minutes from start and end time
  const adjustedStartTime = dayjs(event.StartTime).subtract(5, 'hour').subtract(30, 'minute');
  const adjustedEndTime = dayjs(event.EndTime).subtract(5, 'hour').subtract(30, 'minute');

  return (
    <div className="bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-normal text-gray-800 dark:text-white mb-2 mt-2">
        {event.Title}
      </h1>

      <div className="text-gray-500 dark:text-gray-300 mb-4 font-light text-sm">
        <p>
          {adjustedStartTime.format('dddd, MMMM D')} •{' '}
          {adjustedStartTime.format('hh:mm a')} –{' '}
          {adjustedEndTime.format('hh:mm a')}
        </p>
      </div>

      <Button
        variant="filled"
        leftIcon={<PhoneTransfer />}
        onClick={() => {
          window.location.href = `${window.location.origin}/${callUrl}/${event.MeetingRoomID}/${event.Participants.Doctor.name}`;
        }}
      >
        {' '}
        Join Video Call
      </Button>

      <p className="text-gray-500 dark:text-gray-300 mb-4 mt-1 text-xs">
        {`${window.location.origin}/${callUrl}/${event.MeetingRoomID}`}
      </p>

 
      {/* <div className="mb-4">
        <h2 className="text-blue-500 dark:text-blue-400 mb-1">Join by phone</h2>
        <p className="text-gray-600 dark:text-gray-300">{'+91 234 89 03242'}</p>
      </div> */}

      {/* <div className="mb-4">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <Users />
          <span>{2} guests</span>
        </div>
      </div> */}

      <div className="mb-4">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
          <GpsFix />
          <span>
            {event.Location}{' '}
            <span className="text-gray-400 text-xs">(Patient Location)</span>
          </span>
        </div>
      </div>

      {/* <div className="flex gap-2 mt-6">
        <Button
          fullWidth
          variant="outlined"
          color="success"
          leftIcon={<ThumbsUp />}
        >
          Yes
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          leftIcon={<ThumbsDown />}
        >
          No
        </Button>
        <Button fullWidth variant="outlined" leftIcon={<HandGrabbing />}>
          Maybe
        </Button>
      </div> */}
    </div>
  );
}