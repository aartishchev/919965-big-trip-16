export default class DestinationsModel {
  #apiService = null;
  #destinations = [];

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#apiService.destinations;

      // this.#events = events.map(this.#adaptToClient);
    } catch(err) {
      this.#destinations = [];
    }
  }

  // #adaptToClient = (event) => {
  //   const adaptedDestination = {
  //     ...event.destination,
  //     photos: event.destination.pictures
  //   };

  //   delete adaptedDestination.pictures;

  //   const adaptedEvent = {...event,
  //     destination: adaptedDestination,
  //     dateFrom: new Date(event['date_from']),
  //     dateTo: new Date(event['date_to']),
  //     basePrice: event['base_price'],
  //     isFavorite: event['is_favorite']
  //   };

  //   delete adaptedEvent['date_from'];
  //   delete adaptedEvent['date_to'];
  //   delete adaptedEvent['base_price'];
  //   delete adaptedEvent['is_favorite'];

  //   return adaptedEvent;
  // }
}
