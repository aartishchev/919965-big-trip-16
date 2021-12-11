import { RenderPosition } from './utils/const.js';
import { createEditEventTemplate } from './view/edit-event.js';
import { createFilterTabsTemplate } from './view/filter-tabs.js';
import { createNavTabsTemplate } from './view/nav-tabs.js';
import { createPointEventTemplate } from './view/point-event.js';
import { createEventsSorterTemplate } from './view/events-sorter.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { pointEvents } from './mock/points.js';
import { descriptionEvents } from './mock/descriptions';
import { destinations } from './mock/destinations';
import {
  renderTemplate,
  renderEvent,
} from './utils/useRender.js';

const tripInfoContainer = document.querySelector('.trip-main');
renderTemplate(
  tripInfoContainer,
  createTripInfoTemplate(pointEvents),
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

renderEvent(eventsList, createEditEventTemplate(pointEvents[0], descriptionEvents[0], destinations));

for (let i = 1; i < pointEvents.length; i++) {
  renderEvent(eventsList, createPointEventTemplate(pointEvents[i]));
}
