import EditEvent from './view/edit-event.js';
import FilterTabs from './view/filter-tabs.js';
import NavTabs from './view/nav-tabs.js';
import PointEvent from './view/point-event.js';
import EventsSorter from './view/events-sorter.js';
import TripInfo from './view/trip-info.js';
import { RenderPosition } from './utils/const.js';
import { renderElement } from './utils/useRender.js';
import { pointEvents } from './mock/points.js';
import { descriptionEvents } from './mock/descriptions.js';
import { destinations } from './mock/destinations.js';

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

const renderEvent = (eventsContainer, event, description, eventDestinations) => {
  const pointEventComponent = new PointEvent(event);
  const editEventComponent = new EditEvent(event, description, eventDestinations);

  const eventWrapper = document.createElement('li');
  eventWrapper.className = 'trip-events__list';
  renderElement(eventWrapper, pointEventComponent.element);

  const replacePointByForm = () => {
    eventWrapper.replaceChild(editEventComponent.element, pointEventComponent.element);
  };

  const replaceFormByPoint = () => {
    eventWrapper.replaceChild(pointEventComponent.element, editEventComponent.element);
  };

  pointEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointByForm();
  });

  editEventComponent.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormByPoint();
  });

  renderElement(eventsContainer, eventWrapper);
};

for (let i = 0; i < pointEvents.length; i++) {
  renderEvent(eventsList, pointEvents[i], descriptionEvents[i], destinations);
}
