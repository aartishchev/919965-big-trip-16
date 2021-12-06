import { createEditEventTemplate } from './view/edit-event.js';
import { createFilterTabsTemplate } from './view/filter-tabs.js';
import { createNavTabsTemplate } from './view/nav-tabs.js';
import { createPointEventTemplate } from './view/point-event.js';
import { createEventsSorterTemplate } from './view/events-sorter.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { generateEventPoint } from './mock/event-point.js';
import {
  renderTemplate,
  renderEvent,
  RenderPosition
} from './utils/useRender.js';

const POINT_EVENTS_COUNT = 2;

const pointEvents = Array.from({ length: POINT_EVENTS_COUNT }, generateEventPoint);

const tripInfoContainer = document.querySelector('.trip-main');
renderTemplate(
  tripInfoContainer,
  createTripInfoTemplate(),
  RenderPosition.AFTER_BEGIN
);

const navTabsContainer = document.querySelector('.trip-controls__navigation');
renderTemplate(navTabsContainer, createNavTabsTemplate());

const filterTabsContainer = document.querySelector('.trip-controls__filters');
renderTemplate(filterTabsContainer, createFilterTabsTemplate());

const tripEventsContainer = document.querySelector('.trip-events');
renderTemplate(tripEventsContainer, createEventsSorterTemplate());

const eventsList = document.createElement('ul');
eventsList.className = 'trip-events__list';
tripEventsContainer.appendChild(eventsList);

renderEvent(eventsList, createEditEventTemplate(pointEvents[0]));

for (let i = 1; i < POINT_EVENTS_COUNT; i++) {
  renderEvent(eventsList, createPointEventTemplate(pointEvents[i]));
}
