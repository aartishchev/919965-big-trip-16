import EditEventView from '../view/edit-event-view.js';
import PointEventView from '../view/point-event-view.js';
import { renderElement, replaceElement, removeComponent } from '../utils/render.js';
import { Mode, UserAction, UpdateType, State } from '../utils/const.js';

export default class EventPresenter {
  #eventContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointEventComponent = null;
  #editEventComponent = null;

  #event = null;
  #destinations = [];
  #options = [];
  #mode = Mode.DEFAULT;

  constructor (eventContainer, changeData, changeMode) {
    this.#eventContainer = eventContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event, destinations = this.#destinations, options = this.#options) => {
    this.#event = event;
    this.#destinations = destinations;
    this.#options = options;

    const prevPointEventComponent = this.#pointEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#pointEventComponent = new PointEventView(this.#event);
    this.#editEventComponent = new EditEventView(this.#event, this.#destinations, this.#options);

    this.#pointEventComponent.setFavoriteToggleHandler(this.#handleFavoriteToggle);
    this.#pointEventComponent.setExpandHandler(this.#handleExpand);
    this.#editEventComponent.setCollapseHandler(this.#handleCollapse);
    this.#editEventComponent.setSubmitHandler(this.#handleSubmit);
    this.#editEventComponent.setDeleteHandler(this.#handleDelete);

    if (prevPointEventComponent === null || prevEditEventComponent === null) {
      renderElement(this.#eventContainer, this.#pointEventComponent);

      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replaceElement(this.#pointEventComponent, prevPointEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replaceElement(this.#editEventComponent, prevEditEventComponent);
      this.#mode = Mode.DEFAULT;
    }

    removeComponent(prevPointEventComponent);
    removeComponent(prevEditEventComponent);
  }

  destroy = () => {
    removeComponent(this.#pointEventComponent);
    removeComponent(this.#editEventComponent);

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editEventComponent.resetEvent(this.#event);
      this.#replaceFormByPoint();
    }
  }

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#editEventComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this.#editEventComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#editEventComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#pointEventComponent.shake(resetFormState);
        this.#editEventComponent.shake(resetFormState);
        break;
    }
  }

  #replacePointByForm = () => {
    replaceElement(this.#editEventComponent, this.#pointEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormByPoint = () => {
    replaceElement(this.#pointEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleExpand = () => {
    this.#replacePointByForm();
  }

  #handleCollapse = () => {
    this.#editEventComponent.resetEvent(this.#event);
    this.#replaceFormByPoint();
  }

  #handleFavoriteToggle = () => {
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      { ...this.#event, isFavorite: !this.#event.isFavorite }
    );
  };

  #handleSubmit = (event) => {
    this.#changeData(UserAction.UPDATE_EVENT, UpdateType.MAJOR, event);
  }

  #handleDelete = (event) => {
    this.#changeData(UserAction.DELETE_EVENT, UpdateType.MAJOR, event);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editEventComponent.resetEvent(this.#event);
      this.#replaceFormByPoint();
    }
  }
}
