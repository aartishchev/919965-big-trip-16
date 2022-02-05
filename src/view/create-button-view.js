import AbstractView from './abstract-view.js';
import { NavItem } from '../utils/const.js';

const createButtonTemplate = (isDisabled) => (
  `<button
    class="trip-main__event-add-btn btn btn--big btn--yellow"
    type="button"
    data-event-item ="${NavItem.ADD_NEW_EVENT}"
    ${isDisabled ? 'disabled' : ''}
  >
    New event
  </button>`
);

export default class CreateButtonView extends AbstractView {
  constructor (data) {
    super();
    this._data = data;
  }

  get template() {
    return createButtonTemplate(this._data);
  }

  setClickHandler = (callback) => {
    this._callback.onClick = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.onClick(evt.target.dataset.eventItem);
  }
}
