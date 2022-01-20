import EventPresenter from './event-presenter.js';
import EventsSorter from '../view/events-sorter.js';
import TripInfo from '../view/trip-info.js';
import EmptyListMsg from '../view/empty-list.js';
import { RenderPosition, SortType, UpdateType, UserAction } from '../utils/const.js';
import { removeComponent, renderElement } from '../utils/render.js';
import { sortByPrice, sortByDate, sortByDuration} from '../utils/event.js';

export default class tripPresenter {
  #eventsContainer = null;
  #infoContainer = null;
  #eventsList = null;

  #eventsSorterComponent = null;
  #tripInfoComponent = null;
  #emptyListMsgComponent = new EmptyListMsg();

  #eventPresenters = new Map();
  #currentSortType = SortType.DATE;

  #eventsModel = null;
  #descriptions = [];
  #destinations = [];
  #options = [];

  constructor(eventsContainer, infoContainer, eventsModel) {
    this.#eventsContainer = eventsContainer;
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
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

    this.#renderSorter();
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
      default:
        throw new Error('Action type is undefined or does not exist');
    }
  }

  #handleModelEvent = (updateType, data = null) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderTripEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      default:
        throw new Error('Update type is undefined or does not exist');
    }
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((p) => p.resetView());
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
    this.#eventsSorterComponent = new EventsSorter();
    this.#eventsSorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    renderElement(this.#eventsContainer, this.#eventsSorterComponent);
  }

  #renderTripInfo = () => {
    this.#tripInfoComponent = new TripInfo(this.events);
    renderElement(this.#infoContainer, this.#tripInfoComponent, RenderPosition.PREPEND);
  }

  #renderEventsList = () => {
    this.#eventsList = document.createElement('ul');
    this.#eventsList.className = 'trip-events__list';

    renderElement(this.#eventsContainer, this.#eventsList);
  }

  #renderEvent = (event, descriptions, destinations, options) => {
    const eventWrapper = document.createElement('li');
    eventWrapper.className = 'trip-events__list';

    const eventPresenter = new EventPresenter(eventWrapper, this.#handleViewAction, this.#handleModeChange);
    eventPresenter.init(event, descriptions, destinations, options);
    this.#eventPresenters.set(event.id, eventPresenter);

    renderElement(this.#eventsList, eventWrapper);
  }

  #renderTripEvents = () => {
    this.events.forEach((event) => {
      this.#renderEvent(event, this.#descriptions, this.#destinations, this.#options);
    });
  };

  #renderBoard = () => {
    if (this.events.length < 1) {
      this.#renderEmptyListMsg();

      return;
    }

    this.#renderTripInfo();
    this.#renderEventsList();
    this.#renderTripEvents();
  }

  #clearBoard = () => {
    if (this.events.length < 1) {
      removeComponent(this.#eventsSorterComponent);
    }

    removeComponent(this.#tripInfoComponent);
    this.#clearEventsList();
    this.#eventsList.remove();
  }

  #clearEventsList = () => {
    this.#eventPresenters.forEach((p) => p.destroy());
    this.#eventPresenters.clear();
  }
}
