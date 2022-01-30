import AbstractObservable from '../utils/abstract-observable.js';

export default class EventsModel extends AbstractObservable {
  #apiService = null;
  #events = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.events.then((events) => {
      console.log(events.map(this.#adaptToClient));
    });
  }

  set events(events) {
    this.#events = [...events];
  }

  get events() {
    return this.#events;
  }

  updateEvent = (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events.splice(index, 1, update);
    this._notify(updateType, update);
  }

  addEvent = (updateType, update) => {
    this.#events = [update, ...this.#events];
    this._notify(updateType, update);
  }

  deleteEvent = (updateType, update) => {
    this.#events = this.#events.filter((event) => event.id !== update.id);
    this._notify(updateType);
  }

  #adaptToClient = (event) => {
    const adaptedEvent = {...event,
      dateFrom: new Date(event['date_from']),
      dateTo: new Date(event['date_to']),
      basePrice: event['base_price'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['base_price'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
