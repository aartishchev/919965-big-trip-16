import { POINT_TYPES, EVENTS_COUNT } from '../utils/const';
import { getRandomInteger } from '../utils/util';
import { options } from './options';
import { destinations } from './destinations';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MAX_DAYS_GAP = 10;
const MIN_DAYS_GAP = 0;
const MIN_BASE_PRICE = 0;
const MAX_BASE_PRICE = 1000;

const generatePointType = () => POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)];

const generateDestination = () => destinations[getRandomInteger(0, destinations.length - 1)];

const generateDateFrom = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const randomMinutes = getRandomInteger(0, dayjs.duration(1, 'day').asMinutes());

  return dayjs().add(daysGap, 'day').add(randomMinutes, 'minute');
};

const generateDateTo = (dateFrom) => {
  const daysGap = getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP);
  const randomMinutes = getRandomInteger(0, dayjs.duration(1, 'day').asMinutes());

  return dateFrom.add(daysGap, 'day').add(randomMinutes, 'minute');
};

const generateOffers = (pointType) => {
  const index = options.findIndex((o) => o.type === pointType);

  return options[index].offers;
};

const generateEventPoint = () => {
  const pointType = generatePointType();
  const dateFrom = generateDateFrom();

  return {
    type: pointType,
    destination: generateDestination(),
    dateFrom: dateFrom.toDate(),
    dateTo: generateDateTo(dateFrom).toDate(),
    basePrice: getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE),
    offers: generateOffers(pointType),
    isFavorite: Boolean(getRandomInteger()),
  };
};

export const pointEvents = Array.from({ length: EVENTS_COUNT }, generateEventPoint);
