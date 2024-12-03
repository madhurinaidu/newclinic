import { Container, DateTabs } from '@libs/ui';

const tabs = [
  {
    label: 'Today',
    subText: 'No Slots',
    key: 'today_no_slots',
    isSlotAvailable: false,
    date: new Date().toISOString(),
  },
  {
    label: 'Tomorrow',
    subText: '15 Slots',
    key: 'tomorrow_slots',
    isSlotAvailable: true,
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
  },
  {
    label: 'Today Evening',
    subText: '5 Slots',
    key: 'today_evening_slots',
    isSlotAvailable: true,
    date: new Date().toISOString(),
  },
  {
    label: '28, Oct',
    subText: '15 Slots',
    key: 'oct_28_slots',
    isSlotAvailable: true,
    date: '2024-10-28',
  },
  {
    label: '29, Oct',
    subText: '10 Slots',
    key: 'oct_29_slots',
    isSlotAvailable: true,
    date: '2024-10-29',
  },
  {
    label: '30, Oct',
    subText: '7 Slots',
    key: 'oct_30_slots',
    isSlotAvailable: true,
    date: '2024-10-30',
  },
];

const daySlots = {
  morning: [
    { label: '8:00 AM', key: 'morning_1', isSlotAvailable: true, hour: 8, minute: 0 },
    { label: '8:30 AM', key: 'morning_2', isSlotAvailable: true, hour: 8, minute: 30 },
  ],
  afternoon: [
    { label: '12:00 PM', key: 'afternoon_1', isSlotAvailable: true, hour: 12, minute: 0 },
    { label: '12:30 PM', key: 'afternoon_2', isSlotAvailable: true, hour: 12, minute: 30 },
  ],
  evening: [
    { label: '5:00 PM', key: 'evening_1', isSlotAvailable: true, hour: 17, minute: 0 },
    { label: '5:30 PM', key: 'evening_2', isSlotAvailable: true, hour: 17, minute: 30 },
  ],
};

const handleSlotSelect = (startTime: string, endTime: string) => {
  console.log(`Selected slot: ${startTime} to ${endTime}`);
};

export default function Index() {
  return (
    <Container isPatient>
      <div style={{ maxWidth: 450 }}>
        <DateTabs tabs={tabs} daySlots={daySlots} onSlotSelect={handleSlotSelect} />
      </div>
    </Container>
  );
}