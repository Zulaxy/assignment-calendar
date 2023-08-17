export interface CalendarEvent {
  title: string;
  hour: string;
  type: string;
}

export interface SingleDay {
  day: string;
  dayOfWeek: string;
  events?: CalendarEvent[];
}
