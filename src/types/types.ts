export interface CalendarEvent {
  title: string;
  hour: string;
  type: string;
  description: string;
  id?: string;
  day?: string | number
}

export interface SingleDayTypes {
  day: string;
  dayOfWeek: string;
  events?: CalendarEvent[] | CalendarEvent;
}

export interface RootState {
  data: SingleDayTypes[];
  clickedDate: string | null;
  modalData: null | CalendarEvent;
  modalOpen: { state: boolean; type: string};
}
