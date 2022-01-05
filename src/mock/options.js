import { getRandomInteger } from '../utils/common';
import { nanoid } from 'nanoid';

const taxiOption = {
  type: 'Taxi',
  offers: [
    {
      id: nanoid(),
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
      id: nanoid(),
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
      id: nanoid(),
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
      id: nanoid(),
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
      id: nanoid(),
      title: 'Add luggage',
      price: '50',
      isAdded: Boolean(getRandomInteger())
    },
    {
      id: nanoid(),
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
      id: nanoid(),
      title: 'Book tickets',
      price: '40',
      isAdded: Boolean(getRandomInteger())
    },
    {
      id: nanoid(),
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
