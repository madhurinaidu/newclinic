import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { ToolbarProps, View } from 'react-big-calendar';
import { cn } from '../../utils/cn';
import { Button } from '../index';
import { CalendarEvent } from './types';

const Toolbar: React.FC<ToolbarProps<CalendarEvent, object>> = (toolbar) => {
  const views: View[] = ['month', 'week', 'day', 'agenda'] as View[];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between mb-4 p-2">
      <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
        <Button
          color="light"
          rounded
          size="sm"
          onClick={() => toolbar.onNavigate('TODAY')}
        >
          Today
        </Button>
        <Button
          onClick={() => toolbar.onNavigate('PREV')}
          size="sm"
          color="light"
          rounded
          // leftIcon={<ArrowLeft />}
        >
          <CaretLeft />
        </Button>
        <Button
          color="light"
          rounded
          isIconButton
          size="sm"
          onClick={() => toolbar.onNavigate('NEXT')}
          // rightIcon={<ArrowRight />}
        >
          <CaretRight />
        </Button>
      </div>

      <span
        className="order-first sm:order-none text-lg font-light text-gray-700 dark:text-gray-300"
        style={{ fontSize: 19 }}
      >
        {toolbar.label}
      </span>

      <div className="inline-flex rounded-md">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => toolbar.onView(view)}
            className={cn(
              `
                px-4 py-2 text-sm font-medium  
                text-gray-700  border border-gray-300 border-r-0 
                last:border-r first:rounded-s-full last:rounded-r-full 
                hover:bg-gray-100 focus:z-10 focus:ring-1 focus:ring-primary 
                focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700
                 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 
                 dark:focus:ring-blue-500 dark:focus:text-white
              `,
              toolbar.view === view &&
                'text-primary bg-primary/10 z-10 ring-1 ring-primary dark:dark:bg-blue-900/50 dark:ring-primary-400'
            )}
          >
            <span className="relative z-10">
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
