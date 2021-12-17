import { createElement } from '../utils/useRender';
import { getTotalPrice } from '../utils/util';
import { Format } from '../utils/const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getFormattedDuration = (startDate, finishDate) => {
  const eventDuration = dayjs(finishDate).diff(dayjs(startDate));
  const wrappedDuration = dayjs.duration(eventDuration);

  if (eventDuration < dayjs.duration(1, 'hours').asMilliseconds()) {
    return wrappedDuration.format(Format.MIN_W_CHAR);
  } else if (eventDuration < dayjs.duration(1, 'days').asMilliseconds()) {
    return wrappedDuration.format(Format.TIME_W_CHAR);
  }

  return wrappedDuration.format(Format.DATE_W_CHAR);
};

const generateOffersTemplate = (allOffers) => {
  if (allOffers.length < 1) {
    return '';
  }

  const offersTemplate = [];

  for (const offer of allOffers) {
    if (offer.isAdded) {
      const offerToRender = (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`
      );

      offersTemplate.push(offerToRender);
    }
  }

  return (
    `<h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">
      ${offersTemplate.join('')}
     </ul>`
  );
};

const createPointEventTemplate = (pointEvent) => {
  const { type, destination, dateFrom, dateTo, basePrice, offers, isFavorite } = pointEvent;

  const totalPrice = getTotalPrice(offers, basePrice);

  const startDay = dayjs(dateFrom).format(Format.MONTH_DATE);
  const startTime = dayjs(dateFrom).format(Format.TIME);
  const startDate = dayjs(dateFrom).format(Format.FULL_DATE);
  const finishTime = dayjs(dateTo).format(Format.TIME);
  const finishDate = dayjs(dateTo).format(Format.FULL_DATE);

  const isFavoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<div class="event">
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
      <h3 class="event__title">${type} ${destination}</h3>
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
        <p class="event__duration">${getFormattedDuration(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
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
    </div>`
  );
};

export default class PointEvent {
  #element = null;
  #event = null;

  constructor(event) {
    this.#event = event;
  }

  get template() {
    return createPointEventTemplate(this.#event);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
