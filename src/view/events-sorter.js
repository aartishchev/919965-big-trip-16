import AbstractView from '../view/abstract-view.js';
import { SORTERS } from '../utils/const.js';

const createEventsSorterTemplate = () => {
  const eventsSorter = SORTERS.map(({ name, type, isChecked, isDisabled }) => (
    `<div class="trip-sort__item trip-sort__item--${name}">
      <input id="sort-${name}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="trip-sort__btn"
        for="sort-${name}"
        ${type ? `data-sort-type=${type}` : ''}
      >
        ${name}
      </label>
    </div>`)
  );

  return (
    `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${eventsSorter.join('')}
    </form>`
  );
};

export default class EventsSorter extends AbstractView {
  get template() {
    return createEventsSorterTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.hasAttribute('data-sort-type')) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
