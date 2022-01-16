import EventPresenter from './event-presenter.js';
import EventsSorter from '../view/events-sorter.js';
import TripInfo from '../view/trip-info.js';
import EmptyListMsg from '../view/empty-list.js';
import { RenderPosition, SortType } from '../utils/const.js';
import { renderElement } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { sortByPrice, sortByDate, sortByDuration} from '../utils/event.js';

export default class tripPresenter {
  #eventsContainer = null;
  #infoContainer = null;
  #eventsList = null;
  #currentSortType = null;
  #eventsModel = null;

  #events = [];
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
    return this.#eventsModel.events;
  }

  init = (events, descriptions, destinations, options) => {
    this.#events = [...events];
    this.#descriptions = [...descriptions];
    this.#destinations = [...destinations];
    this.#options = [...options];

    if (events.length < 1) {
      this.#renderEmptyListMsg();

      return;
    }

    this.#sortTasks();
    this.#renderSorter();
    this.#renderTripInfo();
    this.#renderEventsList();
    this.#renderTripEvents();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((p) => p.resetView());
  }

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  }

  #renderEmptyListMsg = () => {
    renderElement(this.#eventsContainer, this.#emptyListMsgComponent);
  }

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.DURATION:
        this.#events.sort(sortByDuration);
        break;
      case SortType.PRICE:
        this.#events.sort(sortByPrice);
        break;
      default:
        this.#events.sort(sortByDate);
    }

    if (sortType) {
      this.#currentSortType = sortType;
    } else {
      this.#currentSortType = SortType.DATE;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearEventsList();
    this.#renderTripEvents();
  }

  #renderSorter = () => {
    renderElement(this.#eventsContainer, this.#eventsSorterComponent);
    this.#eventsSorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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

  #renderEvent = (event, descriptions, destinations, options) => {
    const eventWrapper = document.createElement('li');
    eventWrapper.className = 'trip-events__list';

    const eventPresenter = new EventPresenter(eventWrapper, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(event, descriptions, destinations, options);
    this.#eventPresenters.set(event.id, eventPresenter);

    renderElement(this.#eventsList, eventWrapper);
  }

  #renderTripEvents = () => {
    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(this.#events[i], this.#descriptions, this.#destinations, this.#options);
    }
  }

  #clearEventsList = () => {
    this.#eventPresenters.forEach((p) => p.destroy());
    this.#eventPresenters.clear();
  }
}
