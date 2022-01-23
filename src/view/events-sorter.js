import AbstractView from '../view/abstract-view.js';
import { SortType } from '../utils/const.js';

const createEventsSorterTemplate = () => (
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    <div class="trip-sort__item trip-sort__item--day">
      <input id="sort-day"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-day"
        checked
      >
      <label
        class="trip-sort__btn"
        for="sort-day"
        data-sort-type=${SortType.DATE}
      >
        Day
      </label>
    </div>

    <div class="trip-sort__item trip-sort__item--event">
      <input
        id="sort-event"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-event"
        disabled
      >
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item trip-sort__item--time">
      <input
        id="sort-time"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-time"
      >
      <label
        class="trip-sort__btn"
        for="sort-time"
        data-sort-type=${SortType.DURATION}
      >
        Time
      </label>
    </div>

    <div class="trip-sort__item trip-sort__item--price">
      <input
        id="sort-price"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-price"
      >
      <label
        class="trip-sort__btn"
        for="sort-price"
        data-sort-type=${SortType.PRICE}
      >
       Price
      </label>
    </div>

    <div class="trip-sort__item trip-sort__item--offer">
      <input
        id="sort-offer"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-offer"
        disabled
      >
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class EventsSorter extends AbstractView {
  get template() {
    return createEventsSorterTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.hasAttribute('data-sort-type')) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
