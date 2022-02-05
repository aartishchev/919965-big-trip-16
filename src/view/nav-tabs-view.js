import AbstractView from './abstract-view.js';
import { NavItem } from '../utils/const.js';

const createNavTabsTemplate = (currentActiveTab) => (
  `<nav class="trip-controls__trip-tabs trip-tabs">
    <a
      class="trip-tabs__btn ${currentActiveTab === NavItem.EVENTS ? 'trip-tabs__btn--active' : ''}"
      href="#"
      data-nav-item ="${NavItem.EVENTS}"
    >
      Table
    </a>
    <a
      class="trip-tabs__btn ${currentActiveTab === NavItem.STATISTICS ? 'trip-tabs__btn--active' : ''}"
      href="#"
      data-nav-item ="${NavItem.STATISTICS}"
    >
      Stats
    </a>
  </nav>`
);

export default class NavTabsView extends AbstractView {
  #currentActiveTab = null;

  constructor(currentActiveTab) {
    super();
    this.#currentActiveTab = currentActiveTab;
  }

  get template() {
    return createNavTabsTemplate(this.#currentActiveTab);
  }

  setTabsClickHandler = (callback) => {
    this._callback.onTabClick = callback;
    this.element.addEventListener('click', this.#tabsClickHandler);
  }

  #tabsClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.onTabClick(evt.target.dataset.navItem);
  }
}
