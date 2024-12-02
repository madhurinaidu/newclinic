import { Container, DateTabs } from '@libs/ui';

const tabs = [
  { label: 'Today', subText: 'No Slots', key: 'to', isSlotAvailable: false },
  {
    label: 'Tomorrow',
    subText: '15 Slots',
    key: 'tdo',
    isSlotAvailable: true,
  },
  { label: 'Today', subText: '5 Slots', key: 'tffdo', isSlotAvailable: true },
  {
    label: '28, Oct',
    subText: '15 Slots',
    key: 'tf09fdo',
    isSlotAvailable: true,
  },
  {
    label: '29, Oct',
    subText: '10 Slots',
    key: 'tf55fdo',
    isSlotAvailable: true,
  },
  {
    label: '30, Oct',
    subText: '7 Slots',
    key: 'tf44fdo',
    isSlotAvailable: true,
  },
];

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <Container isPatient>
      <div style={{ maxWidth: 450 }}>
        <DateTabs tabs={tabs} />
      </div>
    </Container>
  );
}
