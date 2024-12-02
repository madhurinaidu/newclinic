'use client';
import { AutoComplete } from '@libs/ui';
import { Gps, MagnifyingGlass } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

type Size = 'sm' | 'md' | 'lg'; // Define the size type

interface SearchProps {
  size?: Size; // Add size prop to the interface
}

export default function Search({ size = 'lg' }: SearchProps) {
  const router = useRouter();

  return (
    <div className="w-full flex fle-row shadow-md">
      <AutoComplete
        inputProps={{
          leftIcon: <Gps />,
          className:
            'rounded-r-none bg-white border-gray-400 dark:border-gray-500',
          size: size,
        }}
        // withSection
        placeholder="Location.."
        options={[
          {
            label: 'Bengaluru',
            value: 'bengaluru',
          },
          {
            label: 'Mumbai',
            value: 'mumbai',
          },
          {
            label: 'Delhi',
            value: 'delhi',
          },
          {
            label: 'Hyderabad',
            value: 'hyderabad',
          },
        ]}
      />
      <div className="flex-grow">
        <AutoComplete
          onSelect={(item) => {
            router.push(`/search/${item.value}`);
          }}
          inputProps={{
            leftIcon: <MagnifyingGlass />,
            size: size,
            className:
              'rounded-l-none border-l-0 border-gray-400 dark:border-gray-500',
          }}
          withSection
          placeholder="Search Doctors, Clinic, Hospitals.."
          options={[
            {
              label: 'Popular Searches',
              items: [
                { label: 'Normal Delivery', value: 'normal-delivery' },
                { label: 'Gynecologist', value: 'gynecologist' },
                { label: 'Pediatrician', value: 'pediatrician' },
              ],
            },
            {
              label: 'Specialities',
              items: [
                { label: 'Gynecologist', value: 'gynecologist' },
                { label: 'Pediatrician', value: 'pediatrician' },
                { label: 'Dermatologist', value: 'dermatologist' },
                { label: 'Cardiologist', value: 'cardiologist' },
                { label: 'Neurologist', value: 'neurologist' },
                { label: 'Orthopedic', value: 'orthopedic' },
                { label: 'ENT Specialist', value: 'ent-specialist' },
                { label: 'Gastroenterologist', value: 'gastroenterologist' },
                { label: 'Psychiatrist', value: 'psychiatrist' },
                { label: 'Urologist', value: 'urologist' },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
