import { POINT_TYPES, BLANK_DESCRIPTION, BLANK_POINT, EVENT_DURATION_DAYS_LIMIT, Format } from '../utils/const.js';
import { updateItem } from '../utils/common.js';
import SmartView from '../view/smart-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createTypesTemplate = (currentType) => {
  const typesTemplate = [];

  for (const type of POINT_TYPES) {
    const typeToRender = (
      `<div class="event__type-item">
        <input
          id="event-type-${type}"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
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

const createOfferOptionsTemplate = (offers) => {
  const offersTemplate = [];

  for (const offer of offers) {
    const offerToRender = (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="${offer.id}"
          type="checkbox"
          name="${offer.id}"
          ${offer.isAdded ? 'checked' : ''}
        >
        <label
          class="event__offer-label"
          for="${offer.id}"
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

const createRollupBtnTemplate = () => (
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
);

const createEditEventTemplate = (data, destinations, isNewEvent) => {
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

  const isSubmitDisabled = !destinations.includes(destination);

  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type event__type-btn" for="event-type-toggle">
            <span class="visually-hidden">Choose event type</span>
            <img
              class="event__type-icon"
              width="17"
              height="17"
              src="img/icons/${type.toLowerCase()}.png"
              alt="Event type icon"
            >
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINT_TYPES.length > 1 ? createTypesTemplate(type) : ''}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group event__field-group--destination">
          <label class="event__label event__type-output" for="event-destination">
            ${type}
          </label>
          <input
            class="event__input event__input--destination"
            id="event-destination"
            type="text"
            name="event-destination"
            value="${destination}"
            list="destination-list"
          >
          <datalist id="destination-list">
            ${destinations.length > 1 ? createDestinationOptionsTemplate(destinations) : ''}
          </datalist>
        </div>

        <div class="event__field-group event__field-group--time">
          <label class="visually-hidden" for="event-start-time">From</label>
          <input
            class="event__input event__input--time"
            id="event-start-time"
            type="text"
            name="event-start-time"
            value="${startDate}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time">To</label>
          <input
            class="event__input event__input--time"
            id="event-end-time"
            type="text"
            name="event-end-time"
            value="${finishDate}"
          >
        </div>

        <div class="event__field-group event__field-group--price">
          <label class="event__label" for="event-price">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input event__input--price"
            id="event-price"
            type="text"
            name="event-price"
            value="${basePrice}"
          >
        </div>

        <button
          class="event__save-btn btn btn--blue"
          type="submit"
          ${isSubmitDisabled ?  'disabled' : ''}
        >
          Save
        </button>
        <button class="event__reset-btn" type="reset">
          ${isNewEvent ? 'Cancel' : 'Delete'}
        </button>
        ${!isNewEvent ? createRollupBtnTemplate() : ''}
      </header>
      <section class="event__details">
        ${areOffers ? createOfferOptionsTemplate(offers, type) : ''}
        ${isDescriptioned ? createDescriptionTemplate(description, photos, arePhotos) : ''}
      </section>
    </form>
  `);
};

export default class EditEvent extends SmartView {
  #descriptions = null;
  #destinations = null;
  #options = null;
  #isNewEvent = null;
  #startDatepicker = null;
  #finishDatepicker = null;

  constructor(
    event = BLANK_POINT,
    descriptions = [],
    destinations = [],
    options = [],
    isNewEvent = false
  ) {
    super();

    this.#descriptions = descriptions;
    this.#destinations = destinations;
    this.#options = options;
    this.#isNewEvent = isNewEvent;

    this._data = this.#parseEventToData(event);

    this.#setInnerHandlers();
    this.#setDatepickers();
  }

  get template() {
    return createEditEventTemplate(this._data, this.#destinations, this.#isNewEvent);
  }

  removeElement = () => {
    super.removeElement();

    this.#startDatepicker.destroy();
    this.#startDatepicker = null;

    this.#finishDatepicker.destroy();
    this.#finishDatepicker = null;
  }

  resetEvent = (event) => {
    this.updateData(this.#parseEventToData(event));
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickers();

    this.setOnCollapseHandler(this._callback.onCollapse);
    this.setOnSubmitHandler(this._callback.onSubmit);
    this.setOnDeleteHandler(this._callback.onDelete);
  }

  setOnCollapseHandler = (callback) => {
    if (this.#isNewEvent) {
      return;
    }

    this._callback.onCollapse = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCollapseHandler);
  }

  setOnSubmitHandler = (callback) => {
    this._callback.onSubmit = callback;
    this.element.addEventListener('submit', this.#onSubmitHandler);
  }

  setOnDeleteHandler = (callback) => {
    this._callback.onDelete = callback;
    this.element.addEventListener('reset', this.#onDeleteHandler);
  }

  #onCollapseHandler = () => {
    this._callback.onCollapse();
  }

  #onSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.onSubmit(EditEvent.parseDataToEvent(this._data));
  }

  #onDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.onDelete(EditEvent.parseDataToEvent(this._data));
  }

  #setDatepickers = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        dateFormat: Format.DATEPICKER,
        enableTime: true,
        'time_24hr': true,
        onChange: this.#startDateChangeHandler,
      },
    );
    this.#finishDatepicker = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        dateFormat: Format.DATEPICKER,
        enableTime: true,
        'time_24hr': true,
        minDate: this._data.dateFrom,
        maxDate: this._data.dateFrom.fp_incr(EVENT_DURATION_DAYS_LIMIT),
        onChange: this.#finishDataChangeHandler,
      },
    );

  }

  #startDateChangeHandler = ([date]) => {
    this.updateData({ dateFrom: date });
  }

  #finishDataChangeHandler = ([date]) => {
    this.updateData({ dateTo: date });
  }

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('click', this.#onTypeChangeHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('input', this.#onDestinationInputHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#onPriceChangeHandler);

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((el) => el.addEventListener('click', this.#onOfferToggleHandler));
  };

  #onTypeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      const targetType = evt.target.value;

      if (targetType === this._data.type) {
        return;
      }

      const index = this.#options.findIndex((o) => o.type === targetType);
      const newOffers = this.#options[index].offers || [];

      newOffers.forEach((el) => {
        el.isAdded = false;
      });

      this.updateData({
        type: targetType,
        offers: newOffers,
        areOffers: newOffers.length > 0,
      });
    }
  }

  #onDestinationInputHandler = (evt) => {
    const value = evt.target.value;
    const index = this.#destinations.findIndex((el) => el.toLowerCase() === value.toLowerCase());

    if (index > -1) {
      const { description, photos } = this.#descriptions[index];
      this.updateData({
        description,
        photos,
        isDescriptioned: description.length > 0,
        arePhotos: photos.length > 0,
        destination: value
      });

      return;
    }

    this.updateData({ destination: value }, true);
  }

  #onPriceChangeHandler = (evt) => {
    this.updateData({ basePrice: Number(evt.target.value) }, true);
  }

  #onOfferToggleHandler = (evt) => {
    const offer = this._data.offers.find((el) => el.id === evt.target.id);
    offer.isAdded = evt.target.checked;

    this.updateData({ offers: updateItem(this._data.offers, offer) }, true);
  }

  #parseEventToData = (event) => {
    const index = this.#destinations.findIndex((d) => d === event.destination);
    const { description, photos } = this.#descriptions[index] || BLANK_DESCRIPTION;

    return {
      ...event,
      areOffers: event.offers.length > 0,
      isDescriptioned: description.length > 0,
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
