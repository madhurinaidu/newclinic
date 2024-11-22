import React from 'react';

interface DateCellWrapperProps {
  children?: React.ReactNode;
  value: Date;
  range?: Date[];
}

export const DateCellWrapper: React.FC<DateCellWrapperProps> = ({
  children,
  value,
}) => {
  const isToday = new Date().toDateString() === value.toDateString();

  return (
    <div
      className={`rbc-date-cell ${isToday ? 'rbc-today' : ''}`}
      style={{
        position: 'relative',
        height: '100%',
        padding: '4px',
      }}
    >
      {children}
    </div>
  );
};

export default DateCellWrapper;
