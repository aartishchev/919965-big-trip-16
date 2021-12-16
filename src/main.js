import EditEvent from './view/edit-event.js';
import FilterTabs from './view/filter-tabs.js';
import NavTabs from './view/nav-tabs.js';
import PointEvent from './view/point-event.js';
import EventsSorter from './view/events-sorter.js';
import TripInfo from './view/trip-info.js';
import { pointEvents } from './mock/points.js';
import { descriptionEvents } from './mock/descriptions.js';
import { destinations } from './mock/destinations.js';
import { RenderPosition } from './utils/const.js';
import { renderElement, renderEvent } from './utils/useRender.js';

const tripInfoContainer = document.querySelector('.trip-main');
renderElement(tripInfoContainer, new TripInfo(pointEvents).element, RenderPosition.AFTER_BEGIN);

const navTabsContainer = document.querySelector('.trip-controls__navigation');
renderElement(navTabsContainer, new NavTabs().element);

const filterTabsContainer = document.querySelector('.trip-controls__filters');
renderElement(filterTabsContainer, new FilterTabs().element);

const tripEventsContainer = document.querySelector('.trip-events');
renderElement(tripEventsContainer, new EventsSorter().element);

const eventsList = document.createElement('ul');
eventsList.className = 'trip-events__list';
tripEventsContainer.appendChild(eventsList);

renderEvent(eventsList, new EditEvent(pointEvents[0], descriptionEvents[0], destinations).element);

for (let i = 1; i < pointEvents.length; i++) {
  renderEvent(eventsList, new PointEvent(pointEvents[i]).element);
}
