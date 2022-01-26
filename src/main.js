import NavTabs from './view/nav-tabs.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import { renderElement } from './utils/render.js';
import { events } from './mock/points.js';
import { options } from './mock/options.js';
import { descriptions } from './mock/descriptions.js';
import { destinations } from './mock/destinations.js';

const tripInfoContainer = document.querySelector('.trip-main');
const navTabsContainer = document.querySelector('.trip-controls__navigation');
const filterTabsContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

renderElement(navTabsContainer, new NavTabs());

const filterModel = new FilterModel();
const eventsModel = new EventsModel();
eventsModel.events = events;

const filterPresenter = new FilterPresenter(filterTabsContainer, filterModel);
const tripPresenter = new TripPresenter(tripEventsContainer, tripInfoContainer, eventsModel, filterModel);

filterPresenter.init();
tripPresenter.init(descriptions, destinations, options);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
  tripPresenter.createEvent();
});
