import { Format } from '../utils/const';
import { getTotalPrice } from '../utils/useRender';
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

const getDestinationsRoute = (sortedEventsByStartDate) => {
  const route = [];

  for (const event of sortedEventsByStartDate) {
    route.push(event.destination);
  }

  return route.join(' &mdash; ');
};

const getAllPointsTotalPrice = (allEvents) => (
  allEvents.reduce((acc, event) => acc + getTotalPrice(event.offers, event.basePrice), 0)
);

export const createTripInfoTemplate = (pointEvents) => {
  if (pointEvents.length < 1) {
    return '';
  }

  const sortedEventsByStartDate = pointEvents.slice().sort((a, b) => a.dateFrom - b.dateFrom);
  const sortedEventsByFinishDate = pointEvents.slice().sort((a, b) => b.dateTo - a.dateTo);

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
          ${getAllPointsTotalPrice(pointEvents)}
        </span>
      </p>
    </section>`
  );
};
