import NavTabs from '../view/nav-tabs.js';
import { renderElement, replaceElement, removeComponent } from '../utils/render.js';
import { NavItem } from '../utils/const.js';


export default class NavPresenter {
  #navContainer = null;
  #navComponent = null;
  #handleNavClick = null;
  #currentActiveTab = NavItem.EVENTS;

  constructor (navContainer, handleNavClick) {
    this.#navContainer = navContainer;
    this.#handleNavClick = handleNavClick;
  }

  init = () => {
    const prevNavComponent = this.#navComponent;

    this.#navComponent = new NavTabs(this.#currentActiveTab);
    this.#navComponent.setOnTabsClickHandler(this.#handleActiveTabChange);

    if (prevNavComponent === null) {
      renderElement(this.#navContainer, this.#navComponent);

      return;
    }

    replaceElement(this.#navComponent, prevNavComponent);
    removeComponent(prevNavComponent);
  }

  #handleActiveTabChange = (activeTab) => {
    if (this.#currentActiveTab === activeTab) {
      return;
    }

    this.#handleNavClick(activeTab);
    this.#currentActiveTab = activeTab;
    this.init();
  }
}
