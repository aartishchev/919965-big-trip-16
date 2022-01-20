import dayjs from 'dayjs';

export function getTotalPrice(offers, basePrice) {
  return offers.reduce((acc, { isAdded, price }) => {
    if (isAdded) {
      return acc + Number(price);
    }

    return acc;
  }, basePrice);
}

export function getDuration(startDate, finishDate) {
  return dayjs(finishDate).diff(dayjs(startDate));
}

export function sortByPrice (aEvent, bEvent) {
  const aTotalPrice = getTotalPrice(aEvent.offers, aEvent.basePrice);
  const bTotalPrice = getTotalPrice(bEvent.offers, bEvent.basePrice);

  return bTotalPrice - aTotalPrice;
}

export function sortByDate (aEvent, bEvent) {
  return aEvent.dateFrom - bEvent.dateFrom;
}

export function sortByDuration (aEvent, bEvent) {
  const aDuration = getDuration(aEvent.dateFrom, aEvent.dateTo);
  const bDuration = getDuration(bEvent.dateFrom, bEvent.dateTo);

  return bDuration - aDuration;
}
