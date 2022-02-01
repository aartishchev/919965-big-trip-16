import { Format } from './const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function getTotalPrice(offers, basePrice) {
  return offers.reduce((acc, offer) => acc + offer.price, basePrice);
}

export function getDuration(startDate, finishDate) {
  return dayjs(finishDate).diff(dayjs(startDate));
}

export function formatDuration(eventDuration) {
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
}

export function getFormattedEventDuration (startDate, finishDate) {
  const eventDuration = getDuration(startDate, finishDate);

  return formatDuration(eventDuration);
}

export function sortByPrice (aEvent, bEvent) {
  const aTotalPrice = getTotalPrice(aEvent.offers, aEvent.basePrice);
  const bTotalPrice = getTotalPrice(bEvent.offers, bEvent.basePrice);

  return bTotalPrice - aTotalPrice;
}

export function sortByStartDate (aEvent, bEvent) {
  return aEvent.dateFrom - bEvent.dateFrom;
}

export function sortByFinishDate (aEvent, bEvent) {
  return bEvent.dateTo - aEvent.dateTo;
}

export function sortByDuration (aEvent, bEvent) {
  const aDuration = getDuration(aEvent.dateFrom, aEvent.dateTo);
  const bDuration = getDuration(bEvent.dateFrom, bEvent.dateTo);

  return bDuration - aDuration;
}
