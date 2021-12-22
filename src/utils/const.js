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
  DATE_W_CHAR: 'DD[D] HH[H] mm[M]'
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

export const EVENTS_COUNT = 10;
