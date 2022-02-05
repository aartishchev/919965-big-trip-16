import CreateButtonView from '../view/create-button-view.js';
import { renderElement, replaceElement, removeComponent } from '../utils/render.js';

export default class CreateButtonPresenter {
  #buttonComponent = null;
  #handleClick = null;
  #buttonContainer = null;
  #isDisabled = false;

  constructor (buttonContainer, handleOnClick) {
    this.#buttonContainer = buttonContainer;
    this.#handleClick = handleOnClick;
  }

  init = () => {
    const prevButtonComponent = this.#buttonComponent;

    this.#buttonComponent = new CreateButtonView(this.#isDisabled);
    this.#buttonComponent.setClickHandler(this.#handleClick);

    if (prevButtonComponent === null) {
      renderElement(this.#buttonContainer, this.#buttonComponent);

      return;
    }

    replaceElement(this.#buttonComponent, prevButtonComponent);
    removeComponent(prevButtonComponent);
  }

  addDisabled = () => {
    this.#isDisabled = true;
    this.init();
  }

  removeDisabled = () => {
    this.#isDisabled = false;
    this.init();
  }
}
