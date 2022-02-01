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
      this.#destinations = destinations.map(this.#adaptToClient);
    } catch(err) {
      this.#destinations = [];
    }
  }

  #adaptToClient = (destination) => {
    const adaptedDestination = {
      ...destination,
      photos: destination.pictures,
    };

    delete adaptedDestination.pictures;

    return adaptedDestination;
  }
}
