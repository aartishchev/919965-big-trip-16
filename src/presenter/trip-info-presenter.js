import TripInfo from '../view/trip-info';
import { renderElement, replaceElement, removeComponent } from '../utils/render.js';
import { RenderPosition, UpdateType } from '../utils/const';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #tripInfoComponent = null;
  #eventsModel = null;

  constructor(tripInfoContainer, eventsModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    if (this.#eventsModel.events.length < 1 ) {
      return;
    }

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfo(this.#eventsModel.events);

    this.#eventsModel.addObserver(this.#handleEventsUpdate);

    if (prevTripInfoComponent === null) {
      renderElement(this.#tripInfoContainer, this.#tripInfoComponent, RenderPosition.PREPEND);

      return;
    }

    replaceElement(this.#tripInfoComponent, prevTripInfoComponent);
    removeComponent(prevTripInfoComponent);
  }

  destroy = () => {
    removeComponent(this.#tripInfoComponent);
    this.#tripInfoComponent = null;

    this.#eventsModel.removeObserver(this.#handleEventsUpdate);
  }

  #handleEventsUpdate = (updateType) => {
    if (!UpdateType.MAJOR === updateType) {
      return;
    }

    if (this.#eventsModel.events.length < 1) {
      this.destroy();
    } else {
      this.init();
    }
  }
}
