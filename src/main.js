import { createAddEventTemplate } from './view/add-event.js';
import { createFilterTabsTemplate } from './view/filter-tabs.js';
import { createNavTabsTemplate } from './view/nav-tabs.js';
import { createPointEventTemplate } from './view/point-event.js';
import { createEventsSorterTemplate } from './view/events-sorter.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import {
  renderTemplate,
  renderEvents,
  RenderPosition
} from './utils/useRender.js';

const tripInfoContainer = document.querySelector('.trip-main');
renderTemplate(
  tripInfoContainer,
  createTripInfoTemplate(),
  RenderPosition.AFTERBEGIN
);

const navTabsContainer = document.querySelector('.trip-controls__navigation');
renderTemplate(
  navTabsContainer,
  createNavTabsTemplate(),
  RenderPosition.BEFOREEND
);

const filterTabsContainer = document.querySelector('.trip-controls__filters');
renderTemplate(
  filterTabsContainer,
  createFilterTabsTemplate(),
  RenderPosition.BEFOREEND
);

const tripEventsContainer = document.querySelector('.trip-events');
renderTemplate(
  tripEventsContainer,
  createEventsSorterTemplate(),
  RenderPosition.BEFOREEND
);

const POINT_EVENTS_COUNT = 3;
const pointEvents = [];
for (let i = 0; i < POINT_EVENTS_COUNT; i++) {
  pointEvents.push(createPointEventTemplate());
}

const allEvents = [createAddEventTemplate(), ...pointEvents];
if (allEvents.length > 0) {
  renderEvents(tripEventsContainer, allEvents);
}
