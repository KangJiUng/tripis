export function getTravelDays(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const days = [];
  let current = new Date(startDate);

  while (current <= endDate) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}
