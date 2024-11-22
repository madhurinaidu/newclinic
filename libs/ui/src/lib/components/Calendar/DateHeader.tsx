import dayjs from 'dayjs';
import { DateHeaderProps } from 'react-big-calendar';
import { cn } from '../../utils/cn';

const DateHeader: React.FC<DateHeaderProps> = ({ date }) => {
  const isToday = new Date().toDateString() === date.toDateString();
  const isPast = dayjs(date).isBefore(dayjs(), 'day');

  return (
    <div className="flex flex-col items-center p-2 relative">
      <span
        className={cn(
          `text-lg rounded-full w-8 h-8 flex items-center justify-center relative`,
          isToday && 'bg-primary text-white font-semibold',
          isPast && 'text-gray-400 cursor-not-allowed'
        )}
      >
        {date.getDate()}
        {isToday && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-25 dark:bg-primary-100"></span>
        )}
      </span>
    </div>
  );
};
export default DateHeader;
