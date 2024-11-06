import {CalendarDate} from "@internationalized/date";

export function calendarDateToJSDate(calendarDate: CalendarDate): Date {
  // Note: month in JavaScript Date is zero-based (0 for January, 11 for December)
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
}

export function jsDateToCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

export function formatDistanceFromNow(date: string | Date): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - parsedDate.getTime();

  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInMonth = 30 * msInDay;
  const msInYear = 365 * msInDay;

  if (diffInMs < msInMinute) {
    return `${Math.floor(diffInMs / 1000)} seconds ago`;
  } else if (diffInMs < msInHour) {
    return `${Math.floor(diffInMs / msInMinute)} minutes ago`;
  } else if (diffInMs < msInDay) {
    return `${Math.floor(diffInMs / msInHour)} hours ago`;
  } else if (diffInMs < msInMonth) {
    return `${Math.floor(diffInMs / msInDay)} days ago`;
  } else if (diffInMs < msInYear) {
    return `${Math.floor(diffInMs / msInMonth)} months ago`;
  } else {
    return `${Math.floor(diffInMs / msInYear)} years ago`;
  }
}

export function calculateAge(dateString: string): number {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
