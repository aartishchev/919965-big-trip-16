import FilterTabs from '../view/filter-tabs.js';
import { renderElement, replaceElement, removeComponent } from '../utils/render.js';
import { FilterType, UpdateType}  from '../utils/const.js';
import { filter } from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #eventsModel = null;

  constructor(filterContainer, filterModel, eventsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
  }

  get filters() {
    const events = this.#eventsModel.events;

    return [
      {
        type: FilterType.EVERYTHING,
        number: filter(events, FilterType.EVERYTHING).length
      },
      {
        type: FilterType.FUTURE,
        number: filter(events, FilterType.FUTURE).length
      },
      {
        type: FilterType.PAST,
        number: filter(events, FilterType.PAST).length
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterTabs(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#eventsModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      renderElement(this.#filterContainer, this.#filterComponent);

      return;
    }

    replaceElement(this.#filterComponent, prevFilterComponent);
    removeComponent(prevFilterComponent);
  }

  destroy = () => {
    removeComponent(this.#filterComponent);
    this.#filterComponent = null;

    this.#filterModel.removeObserver(this.#handleModelEvent);
    this.#eventsModel.removeObserver(this.#handleModelEvent);

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
