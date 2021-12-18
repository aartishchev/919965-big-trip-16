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
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend'
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
