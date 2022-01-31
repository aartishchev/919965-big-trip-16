import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../utils/const.js';

export default class EventsModel extends AbstractObservable {
  #apiService = null;
  #events = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get events() {
    return this.#events;
  }

  init = async () => {
    try {
      const events = await this.#apiService.events;
      this.#events = events.map(this.#adaptToClient);
    } catch(err) {
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateEvent = async (updateType, update) => {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#apiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events.splice(index, 1, update);
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
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
    const adaptedDestination = {
      ...event.destination,
      photos: event.destination.pictures
    };

    delete adaptedDestination.pictures;

    const adaptedEvent = {...event,
      destination: adaptedDestination,
      dateFrom: new Date(event['date_from']),
      dateTo: new Date(event['date_to']),
      basePrice: event['base_price'],
      isFavorite: event['is_favorite']
    };

    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['base_price'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
