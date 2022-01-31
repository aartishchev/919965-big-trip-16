import EditEvent from '../view/edit-event.js';
import PointEvent from '../view/point-event.js';
import { renderElement, replaceElement, removeComponent } from '../utils/render.js';
import { Mode, UserAction, UpdateType } from '../utils/const.js';

export default class EventPresenter {
  #eventContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointEventComponent = null;
  #editEventComponent = null;

  #event = null;
  #descriptions = [];
  #destinations = [];
  #options = [];
  #mode = Mode.DEFAULT;

  constructor (eventContainer, changeData, changeMode) {
    this.#eventContainer = eventContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (event, descriptions = this.#descriptions, destinations = this.#destinations, options = this.#options) => {
    this.#event = event;
    this.#descriptions = descriptions;
    this.#destinations = destinations;
    this.#options = options;

    const prevPointEventComponent = this.#pointEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#pointEventComponent = new PointEvent(this.#event);
    this.#editEventComponent = new EditEvent(this.#event, this.#descriptions, this.#destinations, this.#options);

    this.#pointEventComponent.setOnExpandHandler(this.#handleOnExpand);
    this.#pointEventComponent.setOnFavoriteHandler(this.#handleOnFavorite);
    this.#editEventComponent.setOnCollapseHandler(this.#handleOnCollapse);
    this.#editEventComponent.setOnSubmitHandler(this.#handleOnSubmit);
    this.#editEventComponent.setOnDeleteHandler(this.#handleOnDelete);

    if (prevPointEventComponent === null || prevEditEventComponent === null) {
      renderElement(this.#eventContainer, this.#pointEventComponent);

      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replaceElement(this.#pointEventComponent, prevPointEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replaceElement(this.#editEventComponent, prevEditEventComponent);
    }

    removeComponent(prevPointEventComponent);
    removeComponent(prevEditEventComponent);
  }

  destroy = () => {
    removeComponent(this.#pointEventComponent);
    removeComponent(this.#editEventComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editEventComponent.resetEvent(this.#event);
      this.#replaceFormByPoint();
    }
  }

  #replacePointByForm = () => {
    replaceElement(this.#editEventComponent, this.#pointEventComponent);
    document.addEventListener('keydown', this.#handleOnEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormByPoint = () => {
    replaceElement(this.#pointEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#handleOnEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #handleOnExpand = () => {
    this.#replacePointByForm();
  }

  #handleOnCollapse = () => {
    this.#editEventComponent.resetEvent(this.#event);
    this.#replaceFormByPoint();
  }

  #handleOnFavorite = () => {
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      { ...this.#event, isFavorite: !this.#event.isFavorite }
    );
  };

  #handleOnSubmit = (event) => {
    this.#changeData(UserAction.UPDATE_EVENT, UpdateType.MAJOR, event);
    this.#replaceFormByPoint();
  }

  #handleOnDelete = (event) => {
    this.#changeData(UserAction.DELETE_EVENT, UpdateType.MAJOR, event);
  }

  #handleOnEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editEventComponent.resetEvent(this.#event);
      this.#replaceFormByPoint();
    }
  }
}
