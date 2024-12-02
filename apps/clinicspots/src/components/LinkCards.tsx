import { Button, cn } from '@libs/ui';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

export function VideoConsultationCard({
  isVertical = false,
  fullWidth = false,
}: {
  isVertical?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-red-50 h-[210px] dark:bg-gray-800 rounded-lg shadow p-6 text-center w-1/2 max-w-[520px] hover:ring-2 hover:ring-red-200 cursor-pointer dark:hover:ring-slate-400',
        isVertical && 'h-auto',
        fullWidth && 'w-full'
      )}
    >
      <div className={cn('flex flex-row', isVertical && 'flex-col')}>
        <div className="flex justify-center mr-2">
          <Image
            src="/video1.png"
            className="dark:opacity-40"
            alt="Instant Video Consultation"
            width={300}
            height={200}
            style={{
              height: '150px',
              width: 'auto',
              maxWidth: 'initial',
            }}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-4 text-red-900 dark:text-white">
            Instant Video Consultation
          </h3>
          <p className="text-gray-900 mt-2 text-md dark:text-gray-300">
            Connect within 60 secs
          </p>
          <Button
            className="mt-7"
            variant="outlined"
            rounded
            color="inherit"
            rightIcon={<ArrowRight />}
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FindDoctorCard() {
  return (
    <div className="bg-indigo-50 h-[210px] dark:bg-gray-800 rounded-lg shadow p-6 text-center w-1/2 max-w-[520px] hover:ring-2 hover:ring-indigo-200 cursor-pointer dark:hover:ring-slate-400">
      <div className="flex flex-row">
        <div className="flex justify-center">
          <Image
            src="/app.webp"
            alt="Instant Video Consultation"
            className="dark:opacity-40"
            width={300}
            height={200}
            style={{ height: '160px', width: 'auto' }}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-4 text-indigo-800 dark:text-white">
            Find the Best Doctors Near You
          </h3>
          <p className="text-gray-900 mt-2 text-md dark:text-gray-300">
            Confirmed by 1000+ Doctors
          </p>
          <Button
            rounded
            className="mt-7"
            variant="outlined"
            color="inherit"
            rightIcon={<ArrowRight />}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
