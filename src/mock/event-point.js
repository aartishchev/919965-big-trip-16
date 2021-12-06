import { POINT_TYPES } from '../utils/const';
import { getRandomInteger } from '../utils/util';
import { options } from './options';
import { description } from './event-description';
import { destinations } from './event-destinations';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const MAX_DAYS_GAP = 10;
const MIN_DAYS_GAP = 0;
const MIN_BASE_PRICE = 0;
const MAX_BASE_PRICE = 1000;
const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const MIN_PHOTOS_QUANTITY = 1;
const MAX_PHOTOS_QUANTITY = 5;

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

const descriptions = description.replaceAll('. ', '.|').split('|');
const getRandomDescription = () => descriptions[getRandomInteger(0, descriptions.length - 1)];
const generateDescription = () => {
  const descriptionLength = getRandomInteger(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH);
  const randomDescription = [];

  for (let i = 0; i < descriptionLength; i++) {
    randomDescription.push(getRandomDescription());
  }

  return randomDescription.join(' ');
};

const generatePhotos = () => {
  const photosLength = getRandomInteger(MIN_PHOTOS_QUANTITY, MAX_PHOTOS_QUANTITY);
  const randomPhotos = [];

  for (let i = 0; i < photosLength; i++) {
    const randomPhoto = `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`;
    randomPhotos.push(randomPhoto);
  }

  return randomPhotos;
};

export const generateEventPoint = () => {
  const pointType = generatePointType();
  const dateFrom = generateDateFrom();

  return {
    type: pointType,
    destination: generateDestination(),
    dateFrom: dateFrom.toDate(),
    dateTo: generateDateTo(dateFrom).toDate(),
    basePrice: getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE),
    offers: generateOffers(pointType),
    description: generateDescription(),
    photos: generatePhotos(),
    isFavorite: Boolean(getRandomInteger())
  };
};
