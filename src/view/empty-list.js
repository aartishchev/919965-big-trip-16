import AbstractView from '../view/abstract-view.js';
import { EmptyFilterMsg } from '../utils/const.js';

const createEmpyListTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class EmptyListMsg extends AbstractView {
  #message = null;

  constructor (message = EmptyFilterMsg.EVERYTHING) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmpyListTemplate(this.#message);
  }
}
