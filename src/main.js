import FilterTabs from './view/filter-tabs.js';
import NavTabs from './view/nav-tabs.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model.js';
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
renderElement(filterTabsContainer, new FilterTabs());

const eventsModel = new EventsModel();
EventsModel.events = events;

const tripPresenter = new TripPresenter(tripEventsContainer, tripInfoContainer, eventsModel);
tripPresenter.init(events, descriptions, destinations, options);
