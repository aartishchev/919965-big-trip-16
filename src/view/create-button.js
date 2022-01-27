import AbstractView from '../view/abstract-view.js';
import { NavItem } from '../utils/const.js';

const createButtonTemplate = () => (
  `<button
    class="trip-main__event-add-btn btn btn--big btn--yellow"
    type="button"
    data-event-item ="${NavItem.ADD_NEW_EVENT}"
  >
    New event
  </button>`
);

export default class CreateButton extends AbstractView {
  get template() {
    return createButtonTemplate();
  }

  setOnClickHander = (callback) => {
    this._callback.onClick = callback;
    this.element.addEventListener('click', this.#onClickHandler);
  }

  #onClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.onClick(evt.target.dataset.eventItem);
  }
}
