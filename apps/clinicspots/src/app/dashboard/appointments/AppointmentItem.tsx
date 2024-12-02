import { IAppointment } from '@app/types/Doctor';
import { Button, cn } from '@libs/ui';
import {
  PersonSimpleWalk,
  TrafficSign,
  VideoCamera,
} from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

function formatDate(time: string) {
  const options = {
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    hour12: true,
    timeZone: 'UTC',
  };
  return new Date(time).toLocaleTimeString('en-US', options);
}

export default function AppointmentItem({
  appointment,
  isCard = false,
  isClosed = false,
}: {
  appointment: IAppointment;
  isCard?: boolean;
  isClosed?: boolean;
}) {
  const router = useRouter();
  const { Participants, StartTime, Title, EndTime } = appointment;

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg p-4',
        isCard
          ? 'flex flex-row justify-between min-w-[250px] md:min-w-[300px] max-w-[400px]'
          : 'flex flex-col'
      )}
    >
      <div
        className={cn(
          'flex items-center',
          isCard ? 'flex-col w-full items-start' : ''
        )}
      >
        <div className="grow">
          <div className="flex items-center gap-4">
            <div className="flex flex-col bg-gray-200 dark:bg-gray-800 rounded-lg p-2 px-3">
              <div className="text-2xl font-bold">
                {dayjs(StartTime).format('DD')}
              </div>
              <div className="text-sm">{dayjs(StartTime).format('MMM')}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold">
                {Participants?.Doctor?.name}
              </div>
              <div className="text-sm">{'First Care Clinic'}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(StartTime)} - {formatDate(EndTime)}
              </div>
              <div className="mt-2">
                <span
                  className={cn(
                    'text-xs bg-indigo-100 dark:bg-indigo-900   font-bold rounded-lg p-1 px-3 inline-flex flex-row gap-2 items-center',
                    Title === 'offline'
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                      : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  )}
                >
                  {Title === 'offline' ? (
                    <PersonSimpleWalk weight="fill" />
                  ) : (
                    <VideoCamera weight="fill" />
                  )}
                  {Title === 'offline' ? 'Clinic Visit' : 'Online'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            'min-w-[200px] flex flex-row gap-2 justify-end',
            isCard ? 'mt-4  min-w-full' : ''
          )}
        >
          {!isClosed && (
            <>
              <Button>Cancel</Button>
              {Title === 'offline' ? (
                <Button
                  leftIcon={<TrafficSign weight="fill" />}
                  variant="filled"
                >
                  Directions
                </Button>
              ) : (
                <Button
                  leftIcon={<VideoCamera weight="fill" />}
                  onClick={() => {
                    router.push(
                      `/call/${appointment.MeetingID}/${Participants?.Doctor?.name}`
                    );
                  }}
                  color="warning"
                  variant="filled"
                >
                  Join
                </Button>
              )}
            </>
          )}
          {isClosed && <Button variant="outlined">Book Again</Button>}
        </div>
      </div>
    </div>
  );
}
