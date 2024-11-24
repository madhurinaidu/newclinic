import dayjs from 'dayjs';
import { EventWrapperProps } from 'react-big-calendar';
import { CalendarEvent } from './types';

const EventWrapper: React.FC<EventWrapperProps<CalendarEvent>> = ({
  event,
  onClick,
  onDoubleClick,
  style,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        height: `${style?.height}%`,
        top: `${style?.top}%`,
        width: `${style?.width}%`,
        left: `${style?.left}%`,
      }}
      className={`p-0.5 rbc-event whitespace-nowrap overflow-hidden text-ellipsis ${className}`}
    >
      {/* <div
        
        style={{ borderWidth: 1 }}
        className="cal-event-wrapper whitespace-nowrap overflow-hidden text-ellipsis"
      > */}
      {dayjs(event.start).format('hh:mm a')} - {event.title}
      {/* </div> */}
    </div>
  );
};

export default EventWrapper;
