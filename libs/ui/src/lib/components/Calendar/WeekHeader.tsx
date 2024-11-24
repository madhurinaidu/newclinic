import dayjs from 'dayjs';
import { HeaderProps } from 'react-big-calendar';
import { cn } from '../../utils/cn';

export default function WeekHeader(props: HeaderProps) {
  const { date } = props;
  const isToday = new Date().toDateString() === date.toDateString();
  return (
    <div className="py-2 flex flex-col justify-center h-12">
      <div
        className="text-xs text-gray-400 uppercase font-medium mb-1"
        style={{ fontSize: 9 }}
      >
        {dayjs(date).format('ddd')}
      </div>
      <div
        className={cn(
          `text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-primary-600 p-2 py-1 relative -top-1`,
          isToday &&
            'bg-primary text-white hover:bg-primary dark:hover:bg-primary hover:ring-offset-2 hover:ring-2 hover:ring-primary'
        )}
      >
        {dayjs(date).format('DD')}
      </div>
    </div>
  );
}
