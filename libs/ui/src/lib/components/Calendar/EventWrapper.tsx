import dayjs from 'dayjs';
import { EventWrapperProps } from 'react-big-calendar';
import { CalendarEvent } from './types';

const EventWrapper: React.FC<EventWrapperProps<CalendarEvent>> = ({
  event,
  onClick,
  onDoubleClick,
}) => {
  return (
    <div className="p-0.5">
      <div
        onClick={onClick}
        style={{ borderWidth: 1 }}
        className="cal-event-wrapper whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {dayjs(event.start).format('hh:mm a')} - {event.title}
      </div>
    </div>
  );
};

export default EventWrapper;
