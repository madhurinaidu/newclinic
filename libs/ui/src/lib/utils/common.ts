export function getTimeFormat(isoDate: string) {
  return new Date(isoDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });
}
