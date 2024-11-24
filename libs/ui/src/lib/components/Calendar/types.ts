type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  desc?: string;
};

export type { CalendarEvent };
