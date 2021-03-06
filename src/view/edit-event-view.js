import { POINT_TYPES, BLANK_POINT, EVENT_DURATION_DAYS_LIMIT, Format, MIN_PRICE_VALUE } from '../utils/const.js';
import SmartView from './smart-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createTypesTemplate = (currentType, isDisabled) => {
  const typesTemplate = POINT_TYPES.map((type) => {
    const loweredType = type.toLowerCase();

    return (
      `<div class="event__type-item">
        <input
          id="event-type-${loweredType}"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${loweredType}"
          ${loweredType === currentType ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
        >
        <label
          class="event__type-label event__type-label--${loweredType}"
          for="event-type-${loweredType}"
        >
          ${type}
        </label>
      </div>`
    );
  });

  return typesTemplate.join('');
};

const createDestinationOptionsTemplate = (destinations, isDisabled) => {
  const destinationOptionsTemplate = destinations.map((destination) => (
    `<option value="${destination}" ${isDisabled ? 'disabled' : ''}></option>`
  ));

  return destinationOptionsTemplate.join('');
};

const createOfferOptionsTemplate = (offers, isDisabled) => {
  const offersTemplate = offers.map(({ id, title, price, isAdded }) => (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="${id}"
        type="checkbox"
        name="${id}"
        ${isAdded ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="event__offer-label"
        for="${id}"
      >
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`)
  );

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
  const photosTemplate = photos.map((photo) => {
    const { src, description } = photo;

    return `<img class="event__photo" src="${src}" alt="${description}" title="${description}"/>`;
  });

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
    isDescriptioned,
    arePhotos,
    typeOffers,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;

  const { description, photos, name } = destination;

  const destinationOptions = destinations.map((dest) => dest.name);

  const offersToRender = typeOffers.map((typeOffer) => {
    if (offers.findIndex((offer) => offer.id === typeOffer.id) > -1) {
      return { ...typeOffer, isAdded: true };
    }

    return { ...typeOffer, isAdded: false};
  });

  const isSubmitDisabled = name.length < 1;

  const startDate = dayjs(dateFrom).format(Format.DATE_TIME);
  const finishDate = dayjs(dateTo).format(Format.DATE_TIME);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
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
            <input
              class="event__type-toggle
              visually-hidden"
              id="event-type-toggle"
              type="checkbox"
              ${isDisabled ? 'disabled' : ''}
            >
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${POINT_TYPES.length > 1 ? createTypesTemplate(type, isDisabled) : ''}
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
              value="${name}"
              list="destination-list"
              ${isDisabled ? 'disabled' : ''}
            >
            <datalist id="destination-list">
              ${destinations.length > 1 ? createDestinationOptionsTemplate(destinationOptions, isDisabled) : ''}
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
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time">To</label>
            <input
              class="event__input event__input--time"
              id="event-end-time"
              type="text"
              name="event-end-time"
              value="${finishDate}"
              ${isDisabled ? 'disabled' : ''}
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
              type="number"
              min="1"
              name="event-price"
              value="${basePrice}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <button
            class="event__save-btn btn btn--blue"
            type="submit"
            ${isSubmitDisabled || isDisabled ? 'disabled' : ''}
          >
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset">
            ${isNewEvent ? 'Cancel' : `${isDeleting ? 'Deleting' : 'Delete'}`}
          </button>
          ${!isNewEvent ? createRollupBtnTemplate() : ''}
        </header>
        <section class="event__details">
          ${data.typeOffers.length > 0 ? createOfferOptionsTemplate(offersToRender, isDisabled) : ''}
          ${isDescriptioned ? createDescriptionTemplate(description, photos, arePhotos) : ''}
        </section>
      </form>
    </li>
  `);
};

export default class EditEventView extends SmartView {
  #destinations = null;
  #options = null;
  #isNewEvent = null;
  #startDatepicker = null;
  #finishDatepicker = null;

  constructor(
    event = BLANK_POINT,
    destinations = [],
    options = [],
    isNewEvent = false
  ) {
    super();

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

    this.#startDatepicker?.destroy();
    this.#startDatepicker = null;

    this.#finishDatepicker?.destroy();
    this.#finishDatepicker = null;
  }

  resetEvent = (event) => {
    this.updateData(this.#parseEventToData(event));
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickers();

    this.setCollapseHandler(this._callback.onCollapse);
    this.setSubmitHandler(this._callback.onSubmit);
    this.setDeleteHandler(this._callback.onDelete);
  }

  setCollapseHandler = (callback) => {
    if (this.#isNewEvent) {
      return;
    }

    this._callback.onCollapse = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#collapseHandler);
  }

  setSubmitHandler = (callback) => {
    this._callback.onSubmit = callback;
    this.element.addEventListener('submit', this.#submitHandler);
  }

  setDeleteHandler = (callback) => {
    this._callback.onDelete = callback;
    this.element.addEventListener('reset', this.#deleteHandler);
  }

  #collapseHandler = () => {
    this._callback.onCollapse();
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.onSubmit(EditEventView.parseDataToEvent(this._data));
  }

  #deleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.onDelete(EditEventView.parseDataToEvent(this._data));
  }

  #setDatepickers = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        dateFormat: Format.DATEPICKER,
        enableTime: true,
        'time_24hr': true,
        maxDate: this._data.dateTo,
        onChange: this.#startDateChangeHandler
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
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationInputHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);
    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((element) => element.addEventListener('click', this.#offerToggleHandler));
  };

  #typeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      const targetType = evt.target.value;

      if (targetType === this._data.type) {
        return;
      }

      const index = this.#options.findIndex((option) => option.type === targetType);
      const typeOffers = this.#options[index]?.offers || [];

      this.updateData({
        type: targetType,
        typeOffers,
        offers: []
      });
    }
  }

  #destinationInputHandler = (evt) => {
    const value = evt.target.value;
    const index = this.#destinations.findIndex((destination) => destination.name.toLowerCase() === value.toLowerCase());
    const submitButton = this.element.querySelector('.event__save-btn');

    if (index > -1) {
      const { name, description, photos } = this.#destinations[index];
      this.updateData({
        destination: { name, description, photos },
        isDescriptioned: description.length > 0,
        arePhotos: photos.length > 0
      });

      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  #priceChangeHandler = (evt) => {
    const value = evt.target.value;

    if ( value < 1) {
      const input = this.element.querySelector('.event__input--price');
      input.value = MIN_PRICE_VALUE;

      this.updateData({ basePrice: Number(MIN_PRICE_VALUE) }, true);
    } else {
      this.updateData({ basePrice: Number(value) }, true);
    }
  }

  #offerToggleHandler = (evt) => {
    const dataTypeOffers = this._data.typeOffers;
    const dataAddedOffers = this._data.offers;

    const currentOffer = dataTypeOffers.find((offer) => offer.id.toString() === evt.target.id);
    const index = dataAddedOffers.findIndex((offer) => offer.id === currentOffer.id);

    if (index === -1) {
      dataAddedOffers.push(currentOffer);
      this.updateData({ offers: dataAddedOffers}, true);
    } else {
      dataAddedOffers.splice(index, 1);
      this.updateData({ offers: dataAddedOffers}, true);
    }
  }

  #parseEventToData = (event) => {
    const { description, photos } = event.destination;

    const index = this.#options.findIndex((option) => option.type === event.type);
    const typeOffers = this.#options[index]?.offers || [];

    return {
      ...event,
      isDescriptioned: description.length > 0,
      arePhotos: photos.length > 0,
      description,
      photos,
      typeOffers,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseDataToEvent = (data) => {
    const event = { ...data };

    delete event.isDescriptioned;
    delete event.arePhotos;
    delete event.description;
    delete event.photos;
    delete event.typeOffers;
    delete event.isDisabled;
    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
