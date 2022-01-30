import AbstractView from './abstract-view.js';

const createLoadingEventsTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingEventsTemplate();
  }
}
