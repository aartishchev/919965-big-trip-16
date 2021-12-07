import { EVENTS_COUNT } from '../utils/const';
import { getRandomInteger } from '../utils/util';

const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const MIN_PHOTOS_QUANTITY = 1;
const MAX_PHOTOS_QUANTITY = 5;
const MIN_PHOTO_NUMBER = 0;
const MAX_PHOTO_NUMBER = 1000;

const descriptionText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const descriptions = descriptionText.replaceAll('. ', '.|').split('|');
const getRandomDescription = () =>
  descriptions[getRandomInteger(0, descriptions.length - 1)];
const generateDescriptionText = () => {
  const descriptionLength = getRandomInteger(
    MIN_DESCRIPTION_LENGTH,
    MAX_DESCRIPTION_LENGTH
  );
  const randomDescription = [];

  for (let i = 0; i < descriptionLength; i++) {
    randomDescription.push(getRandomDescription());
  }

  return randomDescription.join(' ');
};

const generatePhotos = () => {
  const photosLength = getRandomInteger(
    MIN_PHOTOS_QUANTITY,
    MAX_PHOTOS_QUANTITY
  );
  const randomPhotos = [];

  for (let i = 0; i < photosLength; i++) {
    const randomPhoto = `http://picsum.photos/248/152?r=${getRandomInteger(
      MIN_PHOTO_NUMBER,
      MAX_PHOTO_NUMBER
    )}`;
    randomPhotos.push(randomPhoto);
  }

  return randomPhotos;
};

const generateDescription = () => ({
  description: generateDescriptionText(),
  photos: generatePhotos(),
});

export const descriptionEvents = Array.from(
  { length: EVENTS_COUNT },
  generateDescription
);
