import Button from '../Button/Button';
import { IDaySlot } from './DateTabs';

export default function DaySlots({
  daySlots,
  title,
  onSlotSelect,
}: {
  daySlots: IDaySlot[];
  title: string;
  onSlotSelect: (hour: number, minute: number) => void;
}) {
  return (
    <div className="flex flex-row gap-7 items-center py-4 last:mb-0 pl-2 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      <div className="flex flex-col gap-2 min-w-[100px]">
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <div className="flex flex-row gap-3 flex-wrap">
        {daySlots.map((slot) => (
          <Button
            size="sm"
            variant="outlined"
            key={slot.key}
            onClick={() => onSlotSelect(slot.hour, slot.minute)}
          >
            <p>{slot.label}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}
