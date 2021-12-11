import { getRandomInteger } from '../utils/util';

const MIN_ID_VALUE = 0;
const MAX_ID_VALUE = 1000;

const taxiOption = {
  type: 'Taxi',
  offers: [
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Order Uber',
      price: '20',
      isAdded: Boolean(getRandomInteger())
    }
  ]
};

const busOption = {
  type: 'Bus',
  offers: [],
};

const trainOption = {
  type: 'Train',
  offers: [
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Order linen',
      price: '5',
      isAdded: Boolean(getRandomInteger())
    }
  ]
};

const shipOption = {
  type: 'Ship',
  offers: [
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Preorder food',
      price: '30',
      isAdded: Boolean(getRandomInteger())
    }
  ]
};

const driveOption = {
  type: 'Drive',
  offers: [
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Rent a car',
      price: '200',
      isAdded: Boolean(getRandomInteger())
    }
  ]
};

const flightOption = {
  type: 'Flight',
  offers: [
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Add luggage',
      price: '50',
      isAdded: Boolean(getRandomInteger())
    },
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Switch to comfort',
      price: '80',
      isAdded: Boolean(getRandomInteger())
    }
  ]
};

const checkInOption = {
  type: 'Check-in',
  offers: []
};

const sightseeingOption = {
  type: 'Sightseeing',
  offers: [
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Book tickets',
      price: '40',
      isAdded: Boolean(getRandomInteger())
    },
    {
      id: getRandomInteger(MIN_ID_VALUE, MAX_ID_VALUE),
      title: 'Lunch in city',
      price: '30',
      isAdded: Boolean(getRandomInteger())
    }
  ]
};

const restaurantOption = {
  type: 'Restaurant',
  offers: []
};

export const options = [
  taxiOption,
  busOption,
  trainOption,
  shipOption,
  driveOption,
  flightOption,
  checkInOption,
  sightseeingOption,
  restaurantOption
];
