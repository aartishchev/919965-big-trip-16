import CreateButton from '../view/create-button.js';
import { renderElement, replaceElement, removeComponent } from '../utils/render.js';

export default class CreateButtonPresenter {
  #buttonComponent = null;
  #handleOnClick = null;
  #buttonContainer = null;
  #isDisabled = false;

  constructor (buttonContainer, handleOnClick) {
    this.#buttonContainer = buttonContainer;
    this.#handleOnClick = handleOnClick;
  }

  init = () => {
    const prevButtonComponent = this.#buttonComponent;

    this.#buttonComponent = new CreateButton(this.#isDisabled);
    this.#buttonComponent.setOnClickHandler(this.#handleOnClick);

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
