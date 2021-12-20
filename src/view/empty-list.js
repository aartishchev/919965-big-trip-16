import { createElement } from '../utils/useRender';
import { EmptyFilterMsg } from '../utils/const';

const createEmpyListTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class EmptyListMsg {
  #element = null;
  #message = null;

  constructor (message = EmptyFilterMsg.EVERYTHING) {
    this.#message = message;
  }

  get template() {
    return createEmpyListTemplate(this.#message);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
