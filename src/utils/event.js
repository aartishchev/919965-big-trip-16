import dayjs from 'dayjs';

export function getTotalPrice(offers, basePrice) {
  return offers.reduce((acc, offer) => acc + Number(offer.price), basePrice);
}

export function getDuration(startDate, finishDate) {
  return dayjs(finishDate).diff(dayjs(startDate));
}

export function sortByPrice (a, b) {
  const aTotalPrice = getTotalPrice(a.offers, a.basePrice);
  const bTotalPrice = getTotalPrice(b.offers, b.basePrice);

  return bTotalPrice - aTotalPrice;
}

export function sortByDate (a, b) {
  return a.dateFrom - b.dateFrom;
}

export function sortByDuration (a, b) {
  const aDuration = getDuration(a.dateFrom, a.dateTo);
  const bDuration = getDuration(b.dateFrom, b.dateTo);

  return bDuration - aDuration;
}
