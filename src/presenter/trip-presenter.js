import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import EventsSorter from '../view/events-sorter.js';
import EmptyListMsg from '../view/empty-list.js';
import { SortType, UpdateType, UserAction, FilterType, BLANK_POINT } from '../utils/const.js';
import { removeComponent, renderElement } from '../utils/render.js';
import { sortByPrice, sortByStartDate, sortByDuration} from '../utils/event.js';
import { filter } from '../utils/filter.js';

export default class tripPresenter {
  #eventsContainer = null;
  #eventsList = null;

  #eventsSorterComponent = null;
  #emptyListMsgComponent = null;

  #eventsModel = null;
  #filterModel = null;

  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DATE;
  #currentFilterType = FilterType.EVERYTHING;

  #descriptions = [];
  #destinations = [];
  #options = [];

  constructor(eventsContainer, eventsModel, filterModel) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
  }

  get events() {
    const events = this.#eventsModel.events;
    this.#currentFilterType = this.#filterModel.filter;
    const filteredEvents = filter(events, this.#currentFilterType);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredEvents.sort(sortByStartDate);
      case SortType.DURATION:
        return filteredEvents.sort(sortByDuration);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
      default:
        throw new Error('Sort type is undefined');
    }
  }

  init = (descriptions, destinations, options) => {
    this.#descriptions = [...descriptions];
    this.#destinations = [...destinations];
    this.#options = [...options];

    this.#renderBoard();

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  destroy = () => {
    this.#descriptions = [];
    this.#destinations = [];
    this.#options = [];

    this.#clearBoard({ resetSortType: true });

    this.#eventsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createEvent = () => {
    if (!this.#eventsList) {
      this.#renderEventsContainer();
    }

    this.#newEventPresenter = new NewEventPresenter(this.#eventsList, this.#handleViewAction);
    this.#newEventPresenter.init(BLANK_POINT, this.#descriptions, this.#destinations, this.#options);
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
        this.#renderEvents();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      default:
        throw new Error('Update type is undefined or does not exist');
    }
  }

  #handleModeChange = () => {
    this.#newEventPresenter?.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  }

  #renderEmptyListMsg = () => {
    this.#emptyListMsgComponent = new EmptyListMsg(this.#currentFilterType);
    renderElement(this.#eventsContainer, this.#emptyListMsgComponent);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEvents();
  }

  #renderSorter = () => {
    this.#eventsSorterComponent = new EventsSorter();
    this.#eventsSorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    renderElement(this.#eventsContainer, this.#eventsSorterComponent);
  }

  #renderEventsContainer = () => {
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

  #renderEvents = () => {
    this.events.forEach((event) => {
      this.#renderEvent(event, this.#descriptions, this.#destinations, this.#options);
    });
  };

  #renderBoard = () => {
    if (this.events.length < 1) {
      this.#renderEmptyListMsg();

      return;
    }

    this.#renderSorter();
    this.#renderEventsContainer();
    this.#renderEvents();
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    if (resetSortType) {
      this.#currentSortType = SortType.DATE;
    }

    if (this.#emptyListMsgComponent) {
      removeComponent(this.#emptyListMsgComponent);
    }

    removeComponent(this.#eventsSorterComponent);
    this.#newEventPresenter?.destroy();
    this.#clearEventsList();
    this.#eventsList.remove();
  }

  #clearEventsList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }
}
