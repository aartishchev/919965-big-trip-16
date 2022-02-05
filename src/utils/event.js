import { Format } from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getTotalPrice = (offers, basePrice) => offers.reduce((acc, offer) => acc + offer.price, basePrice);

export const getDuration = (startDate, finishDate) => dayjs(finishDate).diff(dayjs(startDate));

export const formatDuration = (eventDuration) => {
  const wrappedDuration = dayjs.duration(eventDuration);

  if (eventDuration < dayjs.duration(1, 'hours').asMilliseconds()) {
    return wrappedDuration.format(Format.MIN_W_CHAR);
  }

  if (eventDuration < dayjs.duration(1, 'days').asMilliseconds()) {
    return wrappedDuration.format(Format.HOURS_W_CHAR);
  }

  if (eventDuration < dayjs.duration(1, 'months').asMilliseconds()) {
    return wrappedDuration.format(Format.DAYS_W_CHAR);
  }

  return wrappedDuration.format(Format.MONTHS_W_CHAR);
};

export const getFormattedEventDuration = (startDate, finishDate) => {
  const eventDuration = getDuration(startDate, finishDate);

  return formatDuration(eventDuration);
};

export const sortByPrice = (aEvent, bEvent) => {
  const aTotalPrice = getTotalPrice(aEvent.offers, aEvent.basePrice);
  const bTotalPrice = getTotalPrice(bEvent.offers, bEvent.basePrice);

  return bTotalPrice - aTotalPrice;
};

export const sortByStartDate = (aEvent, bEvent) => aEvent.dateFrom - bEvent.dateFrom;

export const sortByFinishDate = (aEvent, bEvent) => bEvent.dateTo - aEvent.dateTo;

export const sortByDuration = (aEvent, bEvent) => {
  const aDuration = getDuration(aEvent.dateFrom, aEvent.dateTo);
  const bDuration = getDuration(bEvent.dateFrom, bEvent.dateTo);

  return bDuration - aDuration;
};
