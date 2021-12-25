import EditEvent from '../view/edit-event.js';
import PointEvent from '../view/point-event.js';
import EventsSorter from '../view/events-sorter.js';
import TripInfo from '../view/trip-info.js';
import EmptyListMsg from '../view/empty-list.js';
import { RenderPosition } from '../utils/const.js';
import { renderElement, replace } from '../utils/render.js';

export default class tripPresenter {
  #eventsContainer = null;
  #infoContainer = null;

  #events = [];
  #descriptions = [];
  #destinations = [];

  #eventsSorterComponent = new EventsSorter();
  #emptyListMsgComponent = new EmptyListMsg();
  #tripInfoComponent = new TripInfo(this.#events);

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
    this.#renderTripEvents();
  }

  #renderEmptyListMsg = () => {
    renderElement(this.#eventsContainer, this.#emptyListMsgComponent);
  }

  #renderSorter = () => {
    renderElement(this.#eventsContainer, this.#eventsSorterComponent);
  }

  #renderTripInfo = () => {
    renderElement(this.#infoContainer, this.#tripInfoComponent, RenderPosition.PREPEND);
  }

  #renderTripEvents = () => {
    const eventsList = document.createElement('ul');
    eventsList.className = 'trip-events__list';

    renderElement(this.#eventsContainer, eventsList);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvent(eventsList, this.#events[i], this.#descriptions[i], this.#destinations);
    }
  }

  #renderEvent = (eventsContainer, event, description, destinations) => {
    const pointEventComponent = new PointEvent(event);
    const editEventComponent = new EditEvent(event, description, destinations);

    const eventWrapper = document.createElement('li');
    eventWrapper.className = 'trip-events__list';
    renderElement(eventWrapper, pointEventComponent);

    const replacePointByForm = () => {
      replace(editEventComponent.element, pointEventComponent.element);
    };

    const replaceFormByPoint = () => {
      replace(pointEventComponent.element, editEventComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormByPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointEventComponent.setOnExpandHandler(() => {
      replacePointByForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.setOnCollapseHandler(() => {
      replaceFormByPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editEventComponent.setOnSubmitHandler(() => {
      replaceFormByPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    renderElement(eventsContainer, eventWrapper);
  }
}
