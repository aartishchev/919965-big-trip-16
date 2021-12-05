const taxiOption = {
  type: 'Taxi',
  offers: [
    {
      title: 'Order Uber',
      price: '20'
    },
  ],
};

const busOption = {
  type: 'Bus',
  offers: [
    {
      title: 'Book a seat',
      price: '10'
    }
  ],
};

const trainOption = {
  type: 'Train',
  offers: [
    {
      title: 'Order linen',
      price: '5'
    }
  ],
};

const shipOption = {
  type: 'Ship',
  offers: [
    {
      title: 'Preorder food',
      price: '30'
    }
  ]
};

const driveOption = {
  type: 'Drive',
  offers: [
    {
      title: 'Rent a car',
      price: '200'
    }
  ]
};

const flightOption = {
  type: 'Flight',
  offers: [
    {
      title: 'Add luggage',
      price: '50'
    },
    {
      title: 'Switch to comfort',
      price: '80'
    }
  ]
};

const checkInOption = {
  type: 'Check-in',
  offers: [
    {
      title: 'Add breakfast',
      price: '50'
    },
  ]
};

const sightseeingOption = {
  type: 'Sightseeing',
  offers: [
    {
      title: 'Book tickets',
      price: '40'
    },
    {
      title: 'Lunch in city',
      price: '30'
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
