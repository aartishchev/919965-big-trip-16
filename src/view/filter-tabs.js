import { FILTER_TYPES } from '../utils/const.js';
import AbstractView from '../view/abstract-view.js';

const createFilterTabsTemplate = (filterTypes, currentType) => {
  if (filterTypes.length < 1 ) {
    return;
  }

  const tabs = filterTypes.map((type) =>
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${type === currentType ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );

  return (
    `<form class="trip-filters" action="#" method="get">
      ${tabs.join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterTabs extends AbstractView {
  #currentFilter = null;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTabsTemplate(FILTER_TYPES, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
