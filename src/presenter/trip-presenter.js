import EventPresenter from './event-presenter.js';
import EventsSorter from '../view/events-sorter.js';
import TripInfo from '../view/trip-info.js';
import EmptyListMsg from '../view/empty-list.js';
import { RenderPosition } from '../utils/const.js';
import { renderElement } from '../utils/render.js';

export default class tripPresenter {
  #eventsContainer = null;
  #infoContainer = null;
  #eventsList = null;

  #events = [];
  #descriptions = [];
  #destinations = [];

  #eventsSorterComponent = new EventsSorter();
  #emptyListMsgComponent = new EmptyListMsg();

  constructor(eventsContainer, infoContainer) {
    this.#eventsContainer = eventsContainer;
    this.#infoContainer = infoContainer;
  }

  init = (events, descriptions, destinations) => {
    this.#events = [...events];
    this.#descriptions = [...descriptions];
    this.#destinations = [...destinations];

    if (events.length < 1) {
      this.#renderEmptyListMsg();
      return;
    }

    this.#renderSorter();
    this.#renderTripInfo();
    this.#renderEventsList();
    this.#renderTripEvents();
  }

  #renderEmptyListMsg = () => {
    renderElement(this.#eventsContainer, this.#emptyListMsgComponent);
  }

  #renderSorter = () => {
    renderElement(this.#eventsContainer, this.#eventsSorterComponent);
  }

  #renderTripInfo = () => {
    const tripInfoComponent = new TripInfo(this.#events);
    renderElement(this.#infoContainer, tripInfoComponent, RenderPosition.PREPEND);
  }

  #renderEventsList = () => {
    this.#eventsList = document.createElement('ul');
    this.#eventsList.className = 'trip-events__list';

    renderElement(this.#eventsContainer, this.#eventsList);
  }

  #renderEvent = (event, description, destinations) => {
    const eventWrapper = document.createElement('li');
    eventWrapper.className = 'trip-events__list';

    const eventComponent = new EventPresenter(eventWrapper);
    eventComponent.init(event, description, destinations);

    renderElement(this.#eventsList, eventWrapper);
  }

  #renderTripEvents = () => {
    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i], this.#descriptions[i], this.#destinations);
    }
  }
}
