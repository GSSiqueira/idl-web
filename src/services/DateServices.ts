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

export function getISOMonth(date: Date): string {
  return date.toISOString().slice(0, 7);
}

export function checkSameDate(date: Date): boolean {
  let today = new Date();
  return getISODate(today) === getISODate(date);
}

export function checkSameMonth(date: Date): boolean {
  let today = new Date();
  return getISOMonth(today) === getISOMonth(date);
}

export function getSQLDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${
    date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
}

export function getSQLTime(date: Date): string {
  return `${getTimeFormated(date)}:${date.getSeconds()}`;
}
