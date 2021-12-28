import EditEvent from '../view/edit-event.js';
import PointEvent from '../view/point-event.js';
import { renderElement, replace, remove } from '../utils/render.js';

export default class EventPresenter {
  #eventContainer = null;
  #changeData = null;

  #pointEventComponent = null;
  #editEventComponent = null;

  #event = null;
  #description = null;
  #destinations = [];

  constructor (eventContainer, changeData) {
    this.#eventContainer = eventContainer;
    this.#changeData = changeData;
  }

  init = (event, description, destinations) => {
    this.#event = event;
    this.#description = description;
    this.#destinations = destinations;

    const prevPointEventComponent = this.#pointEventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#pointEventComponent = new PointEvent(this.#event);
    this.#editEventComponent = new EditEvent(this.#event, this.#description, this.#destinations);

    this.#pointEventComponent.setOnExpandHandler(this.#handleOnExpand);
    this.#pointEventComponent.setOnFavoriteHandler(this.#handleOnFavorite);
    this.#editEventComponent.setOnCollapseHandler(this.#handleOnCollapse);
    this.#editEventComponent.setOnSubmitHandler(this.#handleOnSubmit);

    if (prevPointEventComponent === null || prevEditEventComponent === null) {
      renderElement(this.#eventContainer, this.#pointEventComponent);
      return;
    }

    if (this.#eventContainer.contains(prevPointEventComponent.element)) {
      replace(this.#pointEventComponent, prevPointEventComponent);
    }

    if (this.#eventContainer.contains(prevEditEventComponent.element)) {
      replace(this.#editEventComponent, prevEditEventComponent);
    }

    remove(prevPointEventComponent);
    remove(prevEditEventComponent);
  }

  destroy = () => {
    remove(this.#pointEventComponent);
    remove(this.#editEventComponent);
  }

  #replacePointByForm = () => {
    replace(this.#editEventComponent, this.#pointEventComponent);
    document.addEventListener('keydown', this.#handleOnEscKeyDown);
  }

  #replaceFormByPoint = () => {
    replace(this.#pointEventComponent, this.#editEventComponent);
    document.removeEventListener('keydown', this.#handleOnEscKeyDown);
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
    this.#changeData({...this.#event, isFavorite: !this.#event.isFavorite}, this.#description, this.#destinations);
  }

  #handleOnEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormByPoint();
    }
  }
}
