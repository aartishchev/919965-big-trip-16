import dayjs from 'dayjs';
import { pointEvents } from '../mock/points';
import { getTotalPrice } from '../utils/useRender';

export const createTripInfoTemplate = () => {
  if (pointEvents.length < 1) {
    return '';
  }

  const sortedEventsByStartDate = pointEvents
    .slice()
    .sort((a, b) => a.dateFrom - b.dateFrom);

  const sortedEventsByFinishDate = pointEvents
    .slice()
    .sort((a, b) => b.dateTo - a.dateTo);

  const getTravelDates = () => {
    const startDate = sortedEventsByStartDate[0].dateFrom;
    const finishDate = sortedEventsByFinishDate[0].dateTo;

    const formattedStartDate = dayjs(startDate).format('MMM DD');
    const isSameMonth = dayjs(startDate).isSame(dayjs(finishDate, 'month'));

    if (isSameMonth) {
      const formattedFinishDate = dayjs(finishDate).format('DD');
      return `${formattedStartDate}&nbsp;&mdash;&nbsp;${formattedFinishDate}`;
    } else {
      const formattedFinishDate = dayjs(finishDate).format('MMM DD');
      return `${formattedStartDate}&nbsp;&mdash;&nbsp;${formattedFinishDate}`;
    }
  };

  const getDestinationsRoute = () => {
    const route = [];

    for (const event of sortedEventsByStartDate) {
      route.push(event.destination);
    }

    return route.join(' &mdash; ');
  };

  const getAllPointsTotalPrice = () => {
    let allPointsTotalPrice = 0;

    for (const pointEvent of pointEvents) {
      allPointsTotalPrice += getTotalPrice(
        pointEvent.offers,
        pointEvent.basePrice
      );
    }

    return allPointsTotalPrice;
  };

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getDestinationsRoute()}</h1>

        <p class="trip-info__dates">${getTravelDates()}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getAllPointsTotalPrice()}</span>
      </p>
    </section>
  `;
};
