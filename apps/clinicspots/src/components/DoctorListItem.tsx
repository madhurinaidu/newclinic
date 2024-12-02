import { Doctor } from '@app/types/Doctor';
import { Button } from '@libs/ui';
import {
  CheckCircle,
  MapPin,
  Medal,
  SealCheck,
  Star,
  ThumbsUp,
  VideoCamera,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import BookAppointment from './BookAppointment';

export default function DoctorListItem({ doctor }: { doctor: Doctor }) {
  return (
    <div className="ring-1 ring-gray-300 dark:ring-gray-700 rounded-lg p-4 shadow-sm relative">
      {doctor.facilities?.[0]?.availability?.message && (
        <div className="absolute top-0 right-0 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 px-2 py-1 rounded-tr-lg text-sm inline-flex items-center gap-1 font-semibold">
          <CheckCircle weight="fill" />
          {doctor.facilities?.[0]?.availability?.message}
        </div>
      )}
      {doctor.verified && (
        <div className="absolute left-0 top-0 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-tl-lg text-sm inline-flex items-center gap-1 font-semibold">
          <Star weight="fill" />
          Recommended
        </div>
      )}
      <div className="flex md:items-center flex-col sm:flex-row">
        <div className="grow">
          <div className="flex md:items-center flex-col sm:flex-row mt-10 md:mt-0">
            <div className="flex justify-center md:justify-start">
              <Image
                src={doctor.display_picture.url}
                alt={doctor.display_picture.alt_text}
                width={92}
                height={92}
                className="w-[92px] h-[92px] object-cover rounded-full ring-4 ring-gray-100 dark:ring-gray-700"
              />
            </div>
            <div className="grow p-6 flex flex-col gap-2">
              <div className="text-xl font-bold flex items-center gap-2">
                <span>{doctor.full_name}</span>
                {doctor.verified && (
                  <SealCheck
                    className="animate-bounce"
                    color="blue"
                    weight="fill"
                  />
                )}
              </div>

              <div className="text-sm text-gray-800 dark:text-gray-400">
                {doctor.specializations.join(', ')}{' '}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Medal />
                {doctor.experience}
              </span>
              <div className="text-sm text-gray-700 font-semibold dark:text-gray-400 flex items-center gap-1">
                <MapPin />
                {doctor.facilities?.[0]?.area?.name}
                {', '}
                {doctor.facilities?.[0]?.city?.name}
              </div>
              <div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm inline-flex items-center gap-1">
                    <ThumbsUp weight="fill" /> 95%
                  </span>
                  <a className="text-sm text-primary-500 dark:text-gray-400 underline font-semibold">
                    1000+ reviews
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full relative items-center gap-2 min-w-[208px]">
          <div className="text-sm text-gray-800 dark:text-gray-400 flex items-end gap-1 border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
            <span className="font-semibold">
              ₹{doctor.facilities?.[0]?.fee}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Fee
            </span>
          </div>
          <BookAppointment />
          <Button
            variant="outlined"
            className="border-2"
            color="warning"
            fullWidth
            leftIcon={<VideoCamera weight="fill" />}
          >
            Book Video Consult
          </Button>
        </div>
      </div>
    </div>
  );
}
