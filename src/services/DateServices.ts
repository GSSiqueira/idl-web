export function getTimeFormated(date: Date): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

export function getISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function checkSameDate(date: Date): boolean {
  let today = new Date();
  return getISODate(today) === getISODate(date);
}
