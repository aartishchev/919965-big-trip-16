import { getFormattedEventDuration } from '../utils/event.js';
import { Format } from '../utils/const.js';
import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';

const generateOffersTemplate = (offers) => {
  if (offers.length < 1) {
    return '';
  }

  const offersTemplate = offers.map(({ title, price }) => (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
  ));

  return (
    `<h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">
      ${offersTemplate.join('')}
     </ul>`
  );
};

const createPointEventTemplate = (event) => {
  const { type, destination, dateFrom, dateTo, basePrice, offers, isFavorite } = event;

  const startDay = dayjs(dateFrom).format(Format.MONTH_DATE);
  const startTime = dayjs(dateFrom).format(Format.TIME);
  const startDate = dayjs(dateFrom).format(Format.FULL_DATE);
  const finishTime = dayjs(dateTo).format(Format.TIME);
  const finishDate = dayjs(dateTo).format(Format.FULL_DATE);

  const isFavoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startDate}">${startDay}</time>
        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type.toLowerCase()}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate}T${startTime}">
              ${startTime}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${finishDate}T${finishTime}">
              ${finishTime}
            </time>
          </p>
          <p class="event__duration">${getFormattedEventDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${generateOffersTemplate(offers)}
        <button class="event__favorite-btn ${isFavoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointEventView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  get template() {
    return createPointEventTemplate(this.#event);
  }

  setExpandHandler = (callback) => {
    this._callback.onExpand = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#expandClickHandler);
  }

  setFavoriteToggleHandler = (callback) => {
    this._callback.onFavorite = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #expandClickHandler = () => {
    this._callback.onExpand();
  }

  #favoriteClickHandler = () => {
    this._callback.onFavorite();
  }
}
