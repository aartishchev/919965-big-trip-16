import AbstractView from '../view/abstract-view.js';
import { NavItem } from '../utils/const.js';

const createNavTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs trip-tabs">
    <a
      class="trip-tabs__btn trip-tabs__btn--active"
      href="#"
      data-nav-item ="${NavItem.EVENTS}"
    >
      Table
    </a>
    <a
      class="trip-tabs__btn"
      href="#"
      data-nav-item ="${NavItem.STATISTICS}"
    >
      Stats
    </a>
  </nav>`
);

export default class NavTabs extends AbstractView {
  get template() {
    return createNavTabsTemplate();
  }

  setOnTabsClickHandler = (callback) => {
    this._callback.onTabClick = callback;
    this.element.addEventListener('click', this.#onTabClickHandler);
  }

  #onTabClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.onTabClick(evt.target.dataset.navItem);
  }
}
