import { getTotalPrice, sortByStartDate, sortByFinishDate } from '../utils/event';
import { Format } from '../utils/const';
import AbstractView from '../view/abstract-view.js';
import dayjs from 'dayjs';

const getTravelDates = (sortedEventsByStartDate, sortedEventsByFinishDate) => {
  const startDate = sortedEventsByStartDate[0].dateFrom;
  const finishDate = sortedEventsByFinishDate[0].dateTo;

  const formattedStartDate = dayjs(startDate).format(Format.MONTH_DATE);

  const isSameMonth = dayjs(startDate).isSame(dayjs(finishDate, 'month'));

  if (isSameMonth) {
    const formattedFinishDate = dayjs(finishDate).format(Format.DATE);

    return `${formattedStartDate}&nbsp;&mdash;&nbsp;${formattedFinishDate}`;
  } else {
    const formattedFinishDate = dayjs(finishDate).format(Format.MONTH_DATE);

    return `${formattedStartDate}&nbsp;&mdash;&nbsp;${formattedFinishDate}`;
  }
};

const getDestinationsRoute = (sortedEvents) => {
  if (sortedEvents.length >= 3) {
    const startEvent = sortedEvents[0].destination;
    const finishEvent = sortedEvents[sortedEvents.length - 1].destination;

    return `${startEvent} &mdash; ... &mdash; ${finishEvent}`;
  } else {
    const route = sortedEvents.map((e) => e.destination);

    return route.join(' &mdash; ');
  }
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

export default class TripInfo extends AbstractView {
  #pointEvents = null;

  constructor(pointEvents = []) {
    super();
    this.#pointEvents = pointEvents;
  }

  get template() {
    return createTripInfoTemplate(this.#pointEvents);
  }
}
