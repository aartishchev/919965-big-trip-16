import FilterTabs from './view/filter-tabs.js';
import NavTabs from './view/nav-tabs.js';
import TripPresenter from './presenter/trip-presenter.js';
import { renderElement } from './utils/render.js';
import { pointEvents } from './mock/points.js';
import { descriptionEvents } from './mock/descriptions.js';
import { destinations } from './mock/destinations.js';

const tripInfoContainer = document.querySelector('.trip-main');
const navTabsContainer = document.querySelector('.trip-controls__navigation');
const filterTabsContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

renderElement(navTabsContainer, new NavTabs());
renderElement(filterTabsContainer, new FilterTabs());

const tripPresenter = new TripPresenter(tripEventsContainer, tripInfoContainer);

tripPresenter.init(pointEvents, descriptionEvents, destinations);
