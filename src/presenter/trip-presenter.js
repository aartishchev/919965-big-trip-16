import EventPresenter from './event-presenter.js';
import EventsSorter from '../view/events-sorter.js';
import TripInfo from '../view/trip-info.js';
import EmptyListMsg from '../view/empty-list.js';
import { RenderPosition, SortType } from '../utils/const.js';
import { renderElement } from '../utils/render.js';
import { sortByPrice, sortByDate, sortByDuration} from '../utils/event.js';

export default class tripPresenter {
  #eventsContainer = null;
  #infoContainer = null;
  #eventsList = null;

  #currentSortType = SortType.DATE;
  #eventsModel = null;
  #descriptions = [];
  #destinations = [];
  #options = [];

  #eventPresenters = new Map();

  #eventsSorterComponent = new EventsSorter();
  #emptyListMsgComponent = new EmptyListMsg();

  constructor(eventsContainer, infoContainer, eventsModel) {
    this.#eventsContainer = eventsContainer;
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#eventsModel.events].sort(sortByDate);
      case SortType.DURATION:
        return [...this.#eventsModel.events].sort(sortByDuration);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortByPrice);
      default:
        throw new Error('Sort type is undefined');
    }
  }

  init = (descriptions, destinations, options) => {
    this.#descriptions = [...descriptions];
    this.#destinations = [...destinations];
    this.#options = [...options];

    if (this.events.length < 1) {
      this.#renderEmptyListMsg();

      return;
    }

    this.#renderSorter();
    this.#renderTripInfo();
    this.#renderEventsList();
    this.#renderTripEvents();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((p) => p.resetView());
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  #renderEmptyListMsg = () => {
    renderElement(this.#eventsContainer, this.#emptyListMsgComponent);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderTripEvents();
  }

  #renderSorter = () => {
    renderElement(this.#eventsContainer, this.#eventsSorterComponent);
    this.#eventsSorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderTripInfo = () => {
    const tripInfoComponent = new TripInfo(this.events);
    renderElement(this.#infoContainer, tripInfoComponent, RenderPosition.PREPEND);
  }

  #renderEventsList = () => {
    this.#eventsList = document.createElement('ul');
    this.#eventsList.className = 'trip-events__list';

    renderElement(this.#eventsContainer, this.#eventsList);
  }

  #renderEvent = (event, descriptions, destinations, options) => {
    const eventWrapper = document.createElement('li');
    eventWrapper.className = 'trip-events__list';

    const eventPresenter = new EventPresenter(eventWrapper, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(event, descriptions, destinations, options);
    this.#eventPresenters.set(event.id, eventPresenter);

    renderElement(this.#eventsList, eventWrapper);
  }

  #renderTripEvents = () => {
    this.events.forEach((event) => {
      this.#renderEvent(event, this.#descriptions, this.#destinations, this.#options);
    });
  };

  #clearEventsList = () => {
    this.#eventPresenters.forEach((p) => p.destroy());
    this.#eventPresenters.clear();
  }
}
