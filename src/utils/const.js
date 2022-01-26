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

export const BLANK_POINT = {
  type: 'Taxi',
  destination: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: 0,
  offers: [],
  isFavorite: false
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
  PRICE: 'price'
};

export const SORTERS = [
  {
    name: 'day',
    type: SortType.DATE,
    isChecked: true,
  },
  {
    name: 'event',
    isDisabled: true,
  },
  {
    name: 'time',
    type: SortType.DURATION,
  },
  {
    name: 'price',
    type: SortType.PRICE,
  },
  {
    name: 'offers',
    isDisabled: true,
  }
];

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past'
};

export const FILTER_TYPES = ['Everything', 'Future', 'Past'];

export const EmptyFilterMsg = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now'
};

export const EVENT_DURATION_DAYS_LIMIT = 28;

export const EVENTS_COUNT = 10;
