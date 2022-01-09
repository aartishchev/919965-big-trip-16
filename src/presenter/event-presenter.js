import EditEvent from '../view/edit-event.js';
import PointEvent from '../view/point-event.js';
import { renderElement, replace, remove } from '../utils/render.js';
import { Mode } from '../utils/const.js';

export default class EventPresenter {
  #eventContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointEventComponent = null;
  #editEventComponent = null;

  #event = null;
  #descriptions = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor (eventContainer, changeData, changeMode) {
    this.#eventContainer = eventContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (
    event,
    descriptions = this.#descriptions,
    destinations = this.#destinations
  ) => {
    this.#event = event;
    this.#descriptions = descriptions;
    this.#destinations = destinations;

    const prevPointEventComponent = this.#pointEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#pointEventComponent = new PointEvent(this.#event);
    this.#editEventComponent = new EditEvent(this.#event, this.#descriptions, this.#destinations);

    this.#pointEventComponent.setOnExpandHandler(this.#handleOnExpand);
    this.#pointEventComponent.setOnFavoriteHandler(this.#handleOnFavorite);
    this.#editEventComponent.setOnCollapseHandler(this.#handleOnCollapse);
    this.#editEventComponent.setOnSubmitHandler(this.#handleOnSubmit);

    if (prevPointEventComponent === null || prevEditEventComponent === null) {
      renderElement(this.#eventContainer, this.#pointEventComponent);

      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointEventComponent, prevPointEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevPointEventComponent);
    remove(prevEditEventComponent);
  }

  destroy = () => {
    remove(this.#pointEventComponent);
    remove(this.#editEventComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormByPoint();
    }
  }

  #replacePointByForm = () => {
    replace(this.#editEventComponent, this.#pointEventComponent);
    document.addEventListener('keydown', this.#handleOnEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormByPoint = () => {
    replace(this.#pointEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#handleOnEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #handleOnExpand = () => {
    this.#replacePointByForm();
  }

  #handleOnCollapse = () => {
    this.#replaceFormByPoint();
  }

  #handleOnSubmit = () => {
    this.#replaceFormByPoint();
  }

  #handleOnFavorite = () => {
    this.#changeData({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #handleOnEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormByPoint();
    }
  }
}
