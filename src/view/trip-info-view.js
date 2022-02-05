import { getTotalPrice, sortByStartDate, sortByFinishDate } from '../utils/event';
import { EVENTS_NUMBER_CONDITION, Format } from '../utils/const';
import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';

const getTravelDates = (sortedEventsByStartDate, sortedEventsByFinishDate) => {
  const startDate = sortedEventsByStartDate[0].dateFrom;
  const finishDate = sortedEventsByFinishDate[0].dateTo;

  const formattedStartDate = dayjs(startDate).format(Format.MONTH_DATE);
  const isSameMonth = dayjs(startDate).isSame(dayjs(finishDate, 'month'));

  if (isSameMonth) {
    const formattedByDateFinishDate = dayjs(finishDate).format(Format.DATE);

    return `${formattedStartDate}&nbsp;&mdash;&nbsp;${formattedByDateFinishDate}`;
  }

  const formattedByMonthFinishDate = dayjs(finishDate).format(Format.MONTH_DATE);

  return `${formattedStartDate}&nbsp;&mdash;&nbsp;${formattedByMonthFinishDate}`;
};

const getDestinationsRoute = (sortedEvents) => {

  if (sortedEvents.length >= EVENTS_NUMBER_CONDITION) {
    const startEvent = sortedEvents[0].destination.name;
    const finishEvent = sortedEvents[sortedEvents.length - 1].destination.name;

    return `${startEvent} &mdash; ... &mdash; ${finishEvent}`;
  }

  const route = sortedEvents.map((event) => event.destination.name);

  return route.join(' &mdash; ');
};

const getAllPointsTotalPrice = (allEvents) => (
  allEvents.reduce((acc, event) => acc + getTotalPrice(event.offers, event.basePrice), 0)
);

const createTripInfoTemplate = (events) => {
  if (events.length < 1) {
    return '';
  }

  const sortedEventsByStartDate = events.sort(sortByStartDate);
  const sortedEventsByFinishDate = events.slice().sort(sortByFinishDate);

  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${getDestinationsRoute(sortedEventsByStartDate)}
        </h1>

        <p class="trip-info__dates">
          ${getTravelDates(sortedEventsByStartDate, sortedEventsByFinishDate)}
        </p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;
        <span class="trip-info__cost-value">
          ${getAllPointsTotalPrice(events)}
        </span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #events = null;

  constructor(events = []) {
    super();
    this.#events = events;
  }

  get template() {
    return createTripInfoTemplate(this.#events);
  }
}
