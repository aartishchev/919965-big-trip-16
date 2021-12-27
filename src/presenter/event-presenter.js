import EditEvent from '../view/edit-event.js';
import PointEvent from '../view/point-event.js';
import { renderElement, replace } from '../utils/render.js';

export default class EventPresenter {
  #eventsListContainer = null;

  #pointEventComponent = null;
  #editEventComponent = null;

  #event = null;
  #description = null;
  #destinations = [];

  constructor (eventsListContainer) {
    this.#eventsListContainer = eventsListContainer;
  }

  init = (event, description, destinations) => {
    this.#event = event;
    this.#description = description;
    this.#destinations = destinations;

    this.#pointEventComponent = new PointEvent(this.#event);
    this.#editEventComponent = new EditEvent(this.#event, this.#description, this.#destinations);

    this.#pointEventComponent.setOnExpandHandler(this.#handleOnExpand);
    this.#editEventComponent.setOnCollapseHandler(this.#handleOnCollapse);
    this.#editEventComponent.setOnSubmitHandler(this.#handleOnSubmit);

    renderElement(this.#eventsListContainer, this.#pointEventComponent);
  }

  #replacePointByForm = () => {
    replace(this.#editEventComponent, this.#pointEventComponent);
    document.addEventListener('keydown', this.#handleOnEscKeyDown);
  }

  #replaceFormByPoint = () => {
    replace(this.#pointEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#handleOnEscKeyDown);
  }

  #handleOnExpand = () => {
    this.#replacePointByForm();
  }

  #handleOnCollapse = () => {
    this.#replaceFormByPoint();
  }

  #handleOnSubmit = () => {
    this.#replaceFormByPoint();
  }

  #handleOnEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormByPoint();
    }
  }
}
