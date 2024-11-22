import { ShowMoreProps } from 'react-big-calendar';
import { Button } from '../index';
import { CalendarEvent } from './types';

export default function ShowMore(props: ShowMoreProps<CalendarEvent>) {
  return (
    <Button size="sm" className="p-0 h-auto">
      Show More
    </Button>
  );
}
