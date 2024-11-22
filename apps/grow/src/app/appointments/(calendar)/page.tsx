import { API } from './../../../config';
import { getSessionUser } from './../../../utils/cookies';
import CalendarContainer from './CalendarContainer';

export default async function Index() {
  const user = await getSessionUser();
  const response = await fetch(
    `${API.appointmentsFilter}?start=${new Date().toISOString()}&end=${new Date(
      new Date().setDate(new Date().getDate() + 100)
    ).toISOString()}`,
    {
      headers: new Headers({ Authorization: `Bearer ${user?.accessToken}` }), // Forward headers from the client
      cache: 'no-store', // or 'force-cache' if you want to cache the response
    }
  );
  const data = await response.json();
  console.log(
    'data',
    data,
    `${API.appointmentsFilter}?end=${new Date().toISOString()}&start=${new Date(
      new Date().setDate(new Date().getDate() - 100)
    ).toISOString()}`
  );
  return <CalendarContainer appointmentData={data} />;
}
