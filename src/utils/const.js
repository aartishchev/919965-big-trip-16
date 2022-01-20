import dayjs from 'dayjs';

export const POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

export const RenderPosition = {
  BEFORE: 'before',
  PREPEND: 'prepend',
  APPEND: 'append',
  AFTER: 'after'
};

export const Format = {
  DATE_TIME: 'DD/MM/YY HH:mm',
  FULL_DATE: 'YYYY-MM-DD',
  MONTH_DATE: 'MMM D',
  DATE: 'DD',
  TIME: 'HH:mm',
  MIN_W_CHAR: 'mm[M]',
  TIME_W_CHAR: 'HH[H] mm[M]',
  DATE_W_CHAR: 'DD[D] HH[H] mm[M]',
  DATEPICKER: 'd/m/y H:i'
};

export const EmptyFilterMsg = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now'
};

export const BLANK_POINT = {
  type: 'Taxi',
  destination: '',
  dateFrom: dayjs().format(Format.DATE_TIME),
  dateTo: dayjs().format(Format.DATE_TIME),
  basePrice: '0',
  offers: []
};

export const BLANK_DESCRIPTION = {
  description: '',
  photos: []
};

export const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export const SortType = {
  DATE: 'date',
  DURATION: 'duration',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const EVENT_DURATION_DAYS_LIMIT = 28;

export const EVENTS_COUNT = 1;
