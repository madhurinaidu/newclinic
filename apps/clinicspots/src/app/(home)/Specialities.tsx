/* eslint-disable @next/next/no-img-element */
import { Button, Container } from '@libs/ui';

const specialists = [
  {
    label: 'Orthopedic',
    img: 'https://doccure.dreamstechnologies.com/react/template/assets/img/specialities/specialities-04.svg',
  },
  {
    label: 'Dentist',
    img: 'https://doccure.dreamstechnologies.com/react/template/assets/img/specialities/specialities-01.svg',
  },
  {
    label: 'Ophthalmology',
    img: 'https://doccure.dreamstechnologies.com/react/template/assets/img/specialities/specialities-02.svg',
  },
  {
    label: 'Neurology',
    img: 'https://doccure.dreamstechnologies.com/react/template/assets/img/specialities/specialities-03.svg',
  },
  {
    label: 'Cardiology',
    img: 'https://doccure.dreamstechnologies.com/react/template/assets/img/specialities/specialities-05.svg',
  },
];

export default function Specialities() {
  return (
    <section className="py-3">
      <Container>
        <h2 className="text-3xl font-bold mb-9 text-center">Specialties</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {specialists.map((specialist) => (
            <div
              key={specialist.label}
              className="bg-white dark:bg-gray-900 rounded-lg hover:shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 p-9 min-w-52 text-center w-[150px] flex items-center justify-center flex-col"
            >
              <img
                src={specialist.img}
                alt={specialist.label}
                className="ring-1 rounded-full p-3"
                style={{ width: '70px', height: '70px' }}
              />
              <h4 className="font-semibold mt-4">{specialist.label}</h4>
            </div>
          ))}
        </div>
        <div className="text-center mt-9">
          <Button variant="outlined" size="lg" color="primary">
            See All Specialties
          </Button>
        </div>
      </Container>
    </section>
  );
}
