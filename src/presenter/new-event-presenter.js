import EditEvent from '../view/edit-event.js';
import { renderElement, removeComponent } from '../utils/render.js';
import { UserAction, UpdateType, RenderPosition } from '../utils/const.js';

export default class NewEventPresenter {
  #eventContainer = null;
  #changeData = null;
  #createButtonPresenter = null;

  #editEventComponent = null;

  #event = null;
  #destinations = [];
  #options = [];

  constructor (eventContainer, changeData) {
    this.#eventContainer = eventContainer;
    this.#changeData = changeData;
  }

  init = (event, destinations = this.#destinations, options = this.#options, createButtonPresenter) => {
    if (this.#editEventComponent !== null) {
      return;
    }

    this.#createButtonPresenter = createButtonPresenter;
    this.#event = event;
    this.#destinations = destinations;
    this.#options = options;

    this.#editEventComponent = new EditEvent(this.#event, this.#destinations, this.#options, true);

    this.#editEventComponent.setOnSubmitHandler(this.#handleOnSubmit);
    this.#editEventComponent.setOnDeleteHandler(this.#handleOnCancel);

    renderElement(this.#eventContainer, this.#editEventComponent, RenderPosition.PREPEND);

    document.addEventListener('keydown', this.#handleOnEscKeyDown);
  }

  destroy = () => {
    if (this.#editEventComponent === null) {
      return;
    }

    this.#createButtonPresenter.removeDisabled();

    removeComponent(this.#editEventComponent);
    this.#editEventComponent = null;

    document.removeEventListener('keydown', this.#handleOnEscKeyDown);
  }

  setSaving = () => {
    this.#editEventComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#editEventComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editEventComponent.shake(resetFormState);
  }

  #handleOnSubmit = (event) => {
    this.#changeData(UserAction.ADD_EVENT, UpdateType.MAJOR, event);
  }

  #handleOnCancel = () => {
    this.destroy();
  }

  #handleOnEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
