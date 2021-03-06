import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import EventsSorterView from '../view/events-sorter-view.js';
import EmptyListMsgView from '../view/empty-list-msg-view.js';
import EventsList from '../view/events-list-view.js';
import LoadingView from '../view/loading-view.js';
import { SortType, UpdateType, UserAction, FilterType, BLANK_POINT, State } from '../utils/const.js';
import { removeComponent, renderElement } from '../utils/render.js';
import { sortByPrice, sortByStartDate, sortByDuration} from '../utils/event.js';
import { filter } from '../utils/filter.js';

export default class tripPresenter {
  #eventsContainer = null;

  #eventsSorterComponent = null;
  #emptyListMsgComponent = null;
  #eventsListComponent = new EventsList();
  #loadingComponent = new LoadingView();

  #eventsModel = null;
  #filterModel = null;

  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DATE;
  #currentFilterType = FilterType.EVERYTHING;
  #isLoading = true;

  #destinations = [];
  #options = [];

  constructor(eventsContainer, eventsModel, filterModel) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter(this.#eventsListComponent, this.#handleViewAction);
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

  init = (destinations, options) => {
    this.#destinations = [...destinations];
    this.#options = [...options];

    this.#renderBoard();

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  destroy = () => {
    this.#destinations = [];
    this.#options = [];

    this.#clearBoard({ resetSortType: true });

    this.#eventsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createEvent = (createButtonPresenter) => {
    if (this.#eventsModel.events.length < 1) {
      renderElement(this.#eventsContainer, this.#eventsListComponent);
      removeComponent(this.#emptyListMsgComponent);
    }

    this.#newEventPresenter.init(BLANK_POINT, this.#destinations, this.#options, createButtonPresenter);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setViewState(State.SAVING);
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch(error) {
          this.#eventPresenters.get(update.id).setViewState(State.ABORTING);
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();

        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch(error) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setViewState(State.DELETING);
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch(error) {
          this.#eventPresenters.get(update.id).setViewState(State.ABORTING);
        }
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
      case UpdateType.INIT:
        this.#isLoading = false;
        removeComponent(this.#loadingComponent);
        this.#renderBoard();
        break;
      default:
        throw new Error('Update type is undefined or does not exist');
    }
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  }

  #renderLoading = () => {
    renderElement(this.#eventsContainer, this.#loadingComponent);
  }

  #renderEmptyListMsg = () => {
    this.#emptyListMsgComponent = new EmptyListMsgView(this.#currentFilterType);
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
    this.#eventsSorterComponent = new EventsSorterView();
    this.#eventsSorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    renderElement(this.#eventsContainer, this.#eventsSorterComponent);
  }

  #renderEvent = (event, destinations, options) => {
    const eventPresenter = new EventPresenter(
      this.#eventsListComponent,
      this.#handleViewAction,
      this.#handleModeChange
    );
    eventPresenter.init(event, destinations, options);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents = () => {
    this.events.forEach((event) => {
      this.#renderEvent(event, this.#destinations, this.#options);
    });
  };

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();

      return;
    }

    if (this.events.length < 1) {
      this.#renderEmptyListMsg();

      return;
    }

    this.#renderSorter();
    renderElement(this.#eventsContainer, this.#eventsListComponent);
    this.#renderEvents();
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    if (resetSortType) {
      this.#currentSortType = SortType.DATE;
    }

    if (this.#emptyListMsgComponent) {
      removeComponent(this.#emptyListMsgComponent);
    }

    this.#newEventPresenter.destroy();
    this.#clearEventsList();
    removeComponent(this.#eventsSorterComponent);
    removeComponent(this.#eventsListComponent);
  }

  #clearEventsList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }
}
