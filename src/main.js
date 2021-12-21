import EditEvent from './view/edit-event.js';
import FilterTabs from './view/filter-tabs.js';
import NavTabs from './view/nav-tabs.js';
import PointEvent from './view/point-event.js';
import EventsSorter from './view/events-sorter.js';
import TripInfo from './view/trip-info.js';
import EmptyListMsg from './view/empty-list.js';
import { RenderPosition } from './utils/const.js';
import { renderElement } from './utils/useRender.js';
import { pointEvents } from './mock/points.js';
import { descriptionEvents } from './mock/descriptions.js';
import { destinations } from './mock/destinations.js';

const tripInfoContainer = document.querySelector('.trip-main');
const navTabsContainer = document.querySelector('.trip-controls__navigation');
const filterTabsContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

renderElement(tripInfoContainer, new TripInfo(pointEvents).element, RenderPosition.AFTER_BEGIN);
renderElement(navTabsContainer, new NavTabs().element);
renderElement(filterTabsContainer, new FilterTabs().element);

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

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormByPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointEventComponent.setOnExpandHandler(() => {
    replacePointByForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editEventComponent.setOnCollapseHandler(() => {
    replaceFormByPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editEventComponent.setOnSubmitHandler(() => {
    replaceFormByPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(eventsContainer, eventWrapper);
};

const renderTripEvents = (eventsContainer) => {
  if (pointEvents.length < 1) {
    renderElement(eventsContainer, new EmptyListMsg().element);
    return;
  }

  renderElement(eventsContainer, new EventsSorter().element);

  const eventsList = document.createElement('ul');
  eventsList.className = 'trip-events__list';
  renderElement(eventsContainer, eventsList);

  for (let i = 0; i < pointEvents.length; i++) {
    renderEvent(eventsList, pointEvents[i], descriptionEvents[i], destinations);
  }
};

renderTripEvents(tripEventsContainer);
