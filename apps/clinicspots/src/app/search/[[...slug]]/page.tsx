/* eslint-disable @next/next/no-img-element */

import {
  DoctorListItem,
  PageBanner,
  Search,
  VideoConsultationCard,
} from '@app/components';
import { Doctor } from '@app/types/Doctor';
import { Container } from '@libs/ui';

export default async function SearchPage() {
  const data = await fetch(
    'https://newapi.clinicspots.com/api/site/doctors/gynecologist/bangalore?lang_code=en'
  );
  const result = await data.json();
  const doctors: Doctor[] = result?.data?.doctors?.data;
  console.log('doctors', doctors);
  return (
    <div>
      <PageBanner className="bg-indigo-50 dark:bg-gray-800 border-b-2 dark:border-gray-700">
        <Container isPatient>
          <div className="pt-5">
            <Search size="lg" />
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row items-center py-4 rounded-md gap-6">
                <select className="p-3 bg-transparent cursor-pointer">
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <select className="p-3 bg-transparent cursor-pointer">
                  <option value="">Experience</option>
                  <option value="1">1 Year</option>
                  <option value="5">5 Years</option>
                  <option value="10">10 Years</option>
                </select>
                <select className="p-3 bg-transparent cursor-pointer">
                  <option value="">No. of Comments</option>
                  <option value="0">0+</option>
                  <option value="10">10+</option>
                  <option value="50">50+</option>
                </select>
              </div>
            </div>
          </div>
        </Container>
      </PageBanner>
      <Container isPatient>
        <div className="flex flex-row gap-8 my-8">
          <div className="flex flex-col gap-7 grow">
            {doctors?.map((doctor) => (
              <DoctorListItem key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="hidden md:w-1/3 md:block">
            <div className="sticky top-24">
              <VideoConsultationCard isVertical fullWidth />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
