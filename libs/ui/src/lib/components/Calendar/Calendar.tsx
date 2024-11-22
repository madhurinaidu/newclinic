'use client';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {
  ComponentType,
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Calendar as BigCalendar,
  Components,
  DateCellWrapperProps,
  DateLocalizer,
  momentLocalizer,
  SlotInfo,
  View,
  Views,
} from 'react-big-calendar';

import { Button, Popup } from '../index';
import DateCellWrapper from './DateCellWrapper';
import DateHeader from './DateHeader';
// import events from './events';
import EventWrapper from './EventWrapper';
import './style.css';
import TimeGutterWrapper from './TimeGutterWrapper';
import Toolbar from './Toolbar';
import { CalendarEvent } from './types';

const mLocalizer = momentLocalizer(moment);

const components: Components<CalendarEvent> = {
  eventWrapper: EventWrapper,
  timeGutterWrapper: TimeGutterWrapper,
  toolbar: Toolbar,
  month: { dateHeader: DateHeader },
  dateCellWrapper: DateCellWrapper as ComponentType<DateCellWrapperProps>,
};
export function Calendar({
  localizer = mLocalizer,
  showDemoLink = true,
  events = [],
  ...props
}: {
  localizer?: DateLocalizer;
  showDemoLink?: boolean;
  events?: CalendarEvent[];
} & Record<string, any>) {
  const [view, setView] = useState<View>(Views.MONTH);
  const ref = useRef<HTMLButtonElement>(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [popUpData, setPopUpData] = useState<{
    clientX?: number;
    clientY?: number;
    ref?: React.RefObject<HTMLButtonElement> | null;
    visible?: boolean;
  }>({ clientX: 0, clientY: 0, ref: null, visible: false });

  const { defaultDate, views } = useMemo(
    () => ({
      components: components,
      defaultDate: new Date(2015, 3, 1),
      views: Object.keys(Views).map((k) => Views[k as keyof typeof Views]),
    }),
    []
  );

  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log('ddd', slotInfo);
    openPopup(undefined, {
      clientX: slotInfo.box?.clientX,
      clientY: slotInfo.box?.clientY,
    });
  }, []);

  const closePopup = () => {
    setPopUpData({ ...popUpData, visible: false });
  };

  const openPopup = (
    ref?: React.RefObject<HTMLButtonElement>,
    box?: { clientX?: number; clientY?: number }
  ) => {
    setPopUpData({
      ...popUpData,
      visible: true,
      ref,
      clientX: box?.clientX,
      clientY: box?.clientY,
    });
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    console.log('Selected event:', event);
    // Add any additional handling here
  };

  return (
    <Fragment>
      <Button
        style={{ position: 'fixed', bottom: 0 }}
        ref={ref}
        onClick={() => setOpen(true)}
      >
        Open
      </Button>
      {/* <Modal isOpen={open} onClose={() => setOpen(false)}><div>Hello</div></Modal> */}
      <Popup
        targetElement={ref?.current}
        isOpen={popUpData?.visible || false}
        onClose={closePopup}
      >
        <h2 className="text-xl font-bold mb-4">Popup Title</h2>
        <p>Your popup content goes here</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </Popup>
      <div className="height600" {...props}>
        <BigCalendar
          style={{ minHeight: 600 }}
          components={{
            eventWrapper: (props) => (
              <EventWrapper
                {...props}
                onClick={() => handleSelectEvent(props.event)}
              />
            ),
            timeGutterWrapper: TimeGutterWrapper,
            toolbar: Toolbar,
            month: { dateHeader: DateHeader },
            dateCellWrapper:
              DateCellWrapper as ComponentType<DateCellWrapperProps>,
          }}
          //   onSelectSlot={onSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable={true}
          date={date}
          onNavigate={setDate}
          events={events}
          localizer={localizer}
          onView={(view) => setView(view)}
          showMultiDayTimes
          view={view}
          step={60}
          views={views}
          onShowMore={(a) => console.log('show more', a)}
        />
      </div>
    </Fragment>
  );
}
Calendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
};
