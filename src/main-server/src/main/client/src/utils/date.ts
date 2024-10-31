import { CalendarDate } from "@internationalized/date";

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
