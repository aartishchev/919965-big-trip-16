import EditEvent from '../view/edit-event.js';
import { renderElement, removeComponent } from '../utils/render.js';
import { UserAction, UpdateType, RenderPosition } from '../utils/const.js';
import { nanoid } from 'nanoid';

export default class NewEventPresenter {
  #eventContainer = null;
  #changeData = null;

  #editEventComponent = null;

  #event = null;
  #destinations = [];
  #options = [];

  constructor (eventContainer, changeData) {
    this.#eventContainer = eventContainer;
    this.#changeData = changeData;
  }

  init = (
    event,
    destinations = this.#destinations,
    options = this.#options
  ) => {
    if (this.#editEventComponent !== null) {
      return;
    }

    this.#event = event;
    this.#destinations = destinations;
    this.#options = options;

    this.#editEventComponent = new EditEvent(this.#event, this.#destinations, this.#options, true);

    this.#editEventComponent.setOnSubmitHandler(this.#handleOnSubmit);
    this.#editEventComponent.setOnDeleteHandler(this.#handleOnCancel);

    renderElement(this.#eventContainer, this.#editEventComponent, RenderPosition.PREPEND);

    document.addEventListener('keydown', this.#handleOnEscKeyDown);
  }

  destroy = () => {
    if (this.#editEventComponent === null) {
      return;
    }

    removeComponent(this.#editEventComponent);
    this.#editEventComponent = null;

    document.removeEventListener('keydown', this.#handleOnEscKeyDown);
  }

  #handleOnSubmit = (event) => {
    this.#changeData(UserAction.ADD_EVENT, UpdateType.MAJOR, { id: nanoid(), ...event });
    this.destroy();
  }

  #handleOnCancel = () => {
    this.destroy();
  }

  #handleOnEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
