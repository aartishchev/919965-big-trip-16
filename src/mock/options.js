import { getRandomInteger } from '../utils/util';

const taxiOption = {
  type: 'Taxi',
  offers: [
    {
      title: 'Order Uber',
      price: '20',
      isAdded: Boolean(getRandomInteger())
    },
  ],
};

const busOption = {
  type: 'Bus',
  offers: [],
};

const trainOption = {
  type: 'Train',
  offers: [
    {
      title: 'Order linen',
      price: '5',
      isAdded: Boolean(getRandomInteger())
    }
  ],
};

const shipOption = {
  type: 'Ship',
  offers: [
    {
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
      title: 'Add luggage',
      price: '50',
      isAdded: Boolean(getRandomInteger())
    },
    {
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
      title: 'Book tickets',
      price: '40',
      isAdded: Boolean(getRandomInteger())
    },
    {
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
