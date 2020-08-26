export function getTimeFormated(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function getISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
