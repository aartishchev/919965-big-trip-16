import { POINT_TYPES, BLANK_DESCRIPTION, BLANK_POINT, Format } from '../utils/const.js';
import { getTotalPrice } from '../utils/event.js';
import AbstractView from '../view/abstract-view.js';
import dayjs from 'dayjs';

const createTypesTemplate = (currentType) => {
  const typesTemplate = [];

  for (const type of POINT_TYPES) {
    const typeToRender = (
      `<div class="event__type-item">
        <input
          id="event-type-${type}"
          class="event__type-input visually-hidden"
          type="radio" name="event-type"
          value="${type}"
          ${type === currentType ? 'checked' : ''}
        >
        <label
          class="event__type-label event__type-label--${type}"
          for="event-type-${type}"
        >
          ${type}
        </label>
      </div>`
    );

    typesTemplate.push(typeToRender);
  }

  return typesTemplate.join('');
};

const createDestinationOptionsTemplate = (destinations) => {
  const destinationOptionsTemplate = [];

  for (const destination of destinations) {
    const destinationOptionToRender = `<option value="${destination}"></option>`;
    destinationOptionsTemplate.push(destinationOptionToRender);
  }

  return destinationOptionsTemplate.join('');
};

const createOfferOptionsTemplate = (offers, type) => {
  const offersTemplate = [];

  for (const offer of offers) {
    const offerForAttribute = `${type.replaceAll(' ', '-')}-${offer.id}`;

    const offerToRender = (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offerForAttribute}"
          type="checkbox"
          name="event-offer-${offerForAttribute}"
          ${offer.isAdded ? 'checked' : ''}
        >
        <label
          class="event__offer-label"
          for="event-offer-${offerForAttribute}"
        >
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );

    offersTemplate.push(offerToRender);
  }

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate.join('')}
      </div>
    </section>`
  );
};

const createPhotosTemplate = (photos) => {
  const photosTemplate = [];

  for (const photo of photos) {
    const photoToRender = (
      `<img
        class="event__photo"
        src="${photo}"
        alt="Event photo"
      />`
    );
    photosTemplate.push(photoToRender);
  }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosTemplate.join('')}
      </div>
    </div>`
  );
};

const createDescriptionTemplate = (description, photos, arePhotos) => (
  `<section class="event__section event__section--destination">
    <h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
      ${arePhotos ? createPhotosTemplate(photos) : ''}
    </section>`
);

const createEditEventTemplate = (data, destinations) => {
  const {
    type,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    offers,
    areOffers,
    isDescriptioned,
    arePhotos,
    description,
    photos
  } = data;

  const startDate = dayjs(dateFrom).format(Format.DATE_TIME);
  const finishDate = dayjs(dateTo).format(Format.DATE_TIME);

  const totalPrice = getTotalPrice(offers, basePrice);

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img
              class="event__type-icon"
              width="17"
              height="17"
              src="img/icons/${type.toLowerCase()}.png"
              alt="Event type icon"
            >
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINT_TYPES.length > 1 ? createTypesTemplate(type) : ''}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group event__field-group--destination">
          <label class="event__label event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input
            class="event__input event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${destination}"
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${destinations.length > 1 ? createDestinationOptionsTemplate(destinations) : ''}
          </datalist>
        </div>

        <div class="event__field-group event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${startDate}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${finishDate}"
          >
        </div>

        <div class="event__field-group event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${totalPrice}"
          >
        </div>

        <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${areOffers ? createOfferOptionsTemplate(offers, type) : ''}
        ${isDescriptioned ? createDescriptionTemplate(description, photos, arePhotos) : ''}
      </section>
    </form>
  `);
};

export default class EditEvent extends AbstractView {
  #descriptions = null;
  #destinations = null;
  #options = null;

  constructor(
    event = BLANK_POINT,
    descriptions = [],
    destinations = [],
    options = []
  ) {
    super();
    this.#descriptions = descriptions;
    this.#destinations = destinations;
    this.#options = options;

    this._data = this.#parseEventToData(event);

    this.#setInnerHandlers();
  }

  get template() {
    return createEditEventTemplate(this._data, this.#destinations);
  }

  updateData = (update) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};

    this.updateElement();

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setOnCollapseHandler(this._callback.onCollapse);
    this.setOnSubmitHandler(this._callback.onSubmit);
  }

  setOnCollapseHandler = (callback) => {
    this._callback.onCollapse = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCollapseHandler);
  }

  #onCollapseHandler = () => {
    this._callback.onCollapse();
  }

  setOnSubmitHandler = (callback) => {
    this._callback.onSubmit = callback;
    this.element.addEventListener('submit', this.#onSubmitHandler);
  }

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#onTypeChangeHandler);
  }

  #onTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      const targetType = evt.target.value;

      if (targetType === this._data.type) {
        return;
      }

      const index = this.#options.findIndex((o) => o.type === targetType);
      const newOffers = this.#options[index].offers || [];

      this.updateData({
        type: targetType,
        offers: newOffers,
        areOffers: newOffers.length > 0,
      });
    }
  }

  #onSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.onSubmit(EditEvent.parseDataToEvent(this._data));
  }

  #parseEventToData = (event) => {
    const index = this.#destinations.findIndex((el) => el === event.destination);
    const { description, photos } = this.#descriptions[index] || BLANK_DESCRIPTION;

    return {
      ...event,
      areOffers: event.offers.length > 0,
      isDescriptioned: description !== '',
      arePhotos: photos.length > 0,
      description,
      photos
    };
  }

  static parseDataToEvent = (data) => {
    const event = { ...data };

    delete event.areOffers;
    delete event.isDescriptioned;
    delete event.arePhotos;
    delete event.description;
    delete event.photos;

    return event;
  }
}
