import { destinations } from './destinations';
import { getRandomInteger } from '../utils/common';

const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const MIN_PHOTOS_QUANTITY = 1;
const MAX_PHOTOS_QUANTITY = 5;
const MIN_PHOTO_NUMBER = 0;
const MAX_PHOTO_NUMBER = 1000;

const descriptionText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const parsedDescriptionText = descriptionText.replaceAll('. ', '.|').split('|');

const getRandomDescription = () =>
  parsedDescriptionText[getRandomInteger(0, parsedDescriptionText.length - 1)];

const generateDescriptionText = (destination) => {
  const descriptionLength = getRandomInteger(
    MIN_DESCRIPTION_LENGTH,
    MAX_DESCRIPTION_LENGTH
  );
  const randomDescription = [destination];

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

const generateDescription = (destination) => ({
  description: generateDescriptionText(destination),
  photos: generatePhotos(),
});

export const descriptions = destinations.map((description, idx) => {
  if (idx === destinations.length - 1) {
    return { description: '', photos: [] };
  }

  return generateDescription(description);
});
