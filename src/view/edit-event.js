import { POINT_TYPES } from '../utils/const';
import { getTotalPrice } from '../utils/useRender';
import { destinations } from '../mock/event-destinations';
import dayjs from 'dayjs';

export const createEditEventTemplate = (pointEvent) => {
  const currentDate = dayjs().format('DD/MM/YY HH:mm');
  const {
    type = 'Taxi',
    destination = '',
    dateFrom = currentDate,
    dateTo = currentDate,
    basePrice = '0',
    offers = [],
    description = '',
    photos = [],
  } = pointEvent;

  const startDate = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const finishDate = dayjs(dateTo).format('DD/MM/YY HH:mm');

  const totalPrice = getTotalPrice(offers, basePrice);

  const createTypesTemplate = () => {
    let typesTemplate = '';
    for (const pointType of POINT_TYPES) {
      const typeToRender = `
        <div class="event__type-item">
          <input
            id="event-type-${pointType.toLowerCase()}-1"
            class="event__type-input visually-hidden"
            type="radio" name="event-type"
            value="${pointType.toLowerCase()}"
          >
          <label
            class="event__type-label event__type-label--${pointType.toLowerCase()}"
            for="event-type-${pointType.toLowerCase()}-1"
          >
            ${pointType}
          </label>
        </div>
      `;

      typesTemplate += typeToRender;
    }

    return typesTemplate;
  };

  const createDestinationOptionsTemplate = () => {
    let destinationOptionsTemplate = '';

    for (const destinationOption of destinations) {
      const destinationOptionToRender = `<option value="${destinationOption}"></option>`;
      destinationOptionsTemplate += destinationOptionToRender;
    }

    return destinationOptionsTemplate;
  };

  const createOfferOptionsTemplate = () => {
    if (offers.length < 1) {
      return '';
    }

    let offersTemplate = '';
    for (const offerOption of offers) {
      const offerForId = offerOption.title.split(' ').pop().toLowerCase();
      const offerToRender = `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${offerForId}-1"
            type="checkbox"
            name="event-offer-${offerForId}"
            ${offerOption.isAdded ? 'checked' : ''}
          >
          <label
            class="event__offer-label"
            for="event-offer-${offerForId}-1"
          >
            <span class="event__offer-title">${offerOption.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offerOption.price}</span>
          </label>
        </div>
      `;

      offersTemplate += offerToRender;
    }

    return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>
    `;
  };

  const createPhotosTemplate = () => {
    if (photos.length < 1) {
      return '';
    }

    let photosTemplate = '';
    for (const photo of photos) {
      const photoToRender = `<img class="event__photo" src="${photo}" alt="Event photo">`;
      photosTemplate += photoToRender;
    }

    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosTemplate}
        </div>
      </div>
    `;
  };

  const createDescriptionTemplate = () => {
    if (description.length < 1) {
      return '';
    }

    return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        ${createPhotosTemplate()}
      </section>
    `;
  };

  return `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypesTemplate()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationOptionsTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishDate}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${totalPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOfferOptionsTemplate()}
        ${createDescriptionTemplate()}
      </section>
    </form>
  `;
};
