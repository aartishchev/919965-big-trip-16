import { options } from './options';
import { getRandomInteger } from '../utils/util';
import dayjs from 'dayjs';

const pointTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];
const generatePointType = () => pointTypes[getRandomInteger(0, pointTypes.length - 1)];

const destinations = ['Amsterdam', 'Chamonix', 'Geneva'];
const generateDestination = () => destinations[getRandomInteger(0, destinations.length - 1)];

const generateOffers = (optionType) => {
  const index = options.findIndex((o) => o.type === optionType);
  return options[index].offers;
};

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const descriptions = description.replaceAll('. ', '.|').split('|');
const getRandomDescription = () => descriptions[getRandomInteger(0, descriptions.length - 1)];

const generateDescription = () => {
  const descriptionLength = getRandomInteger(1, 5);
  const randomDescription = [];

  for (let i = 0; i < descriptionLength; i++) {
    randomDescription.push(getRandomDescription());
  }

  return randomDescription.join(' ');
};

const generatePhotos = () => {
  const photosLength = getRandomInteger(1, 5);
  const randomPhotos = [];

  for (let i = 0; i < photosLength; i++) {
    const randomPhoto = `http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`;
    randomPhotos.push(randomPhoto);
  }

  return randomPhotos;
};

const maxDaysGap = 30;
const generateDateFrom = () => {
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day');
};

const generateDateTo = (dateFrom) => {
  const daysGap = getRandomInteger(1, maxDaysGap);
  return dateFrom.add(daysGap, 'day');
};

export const generateEventPoint = () => {
  const pointType = generatePointType();
  const dateFrom = generateDateFrom();
  return {
    type: generatePointType(),
    destination: generateDestination(),
    dateFrom: dateFrom.toDate(),
    dateTo: generateDateTo(dateFrom).toDate(),
    basePrice: getRandomInteger(0, 1000),
    offers: generateOffers(pointType),
    description: generateDescription(),
    photos: generatePhotos(),
    isFavorite: Boolean(getRandomInteger())
  };
};
