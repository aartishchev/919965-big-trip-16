import { FilterType } from './const';

export const filter = (events, type) => {
  if (type === FilterType.EVERYTHING) {
    return events;
  }

  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  const filteredEvents = events.filter((event) => {
    const eventFromTime = event.dateFrom.getTime();
    const eventToTime = event.dateTo.getTime();

    if (eventFromTime <= currentTime && eventToTime >= currentTime) {
      return true;
    }

    if (type === FilterType.FUTURE) {
      return eventFromTime >= currentTime;
    }

    if (type === FilterType.PAST) {
      return eventToTime <= currentTime;
    }
  });

  return filteredEvents;
};
