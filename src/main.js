import NavTabs from './view/nav-tabs.js';
import StatView from './view/stat-view.js';
import CreateButton from './view/create-button.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import { removeComponent, renderElement } from './utils/render.js';
import { NavItem } from './utils/const.js';
import { events } from './mock/points.js';
import { options } from './mock/options.js';
import { descriptions } from './mock/descriptions.js';
import { destinations } from './mock/destinations.js';
import NavPresenter from './presenter/nav-presenter.js';

const mainContainer = document.querySelector('main .page-body__container');
const tripInfoContainer = document.querySelector('.trip-main');
const navTabsContainer = document.querySelector('.trip-controls__navigation');
const filterTabsContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const eventsModel = new EventsModel();
eventsModel.events = events;

const createButtonComponent = new CreateButton();

const tripPresenter = new TripPresenter(tripEventsContainer, tripInfoContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filterTabsContainer, filterModel);

renderElement(tripInfoContainer, createButtonComponent);

let statisticsComponent = null;

const handleOnNavClick = (navItem) => {
  switch (navItem) {
    case NavItem.ADD_NEW_EVENT:
      removeComponent(statisticsComponent);
      filterPresenter.destroy();
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init(descriptions, destinations, options);
      tripPresenter.createEvent();
      break;
    case NavItem.EVENTS:
      filterPresenter.init();
      tripPresenter.init(descriptions, destinations, options);
      removeComponent(statisticsComponent);
      break;
    case NavItem.STATISTICS:
      filterPresenter.destroy();
      tripPresenter.destroy();
      statisticsComponent = new StatView(eventsModel.events);
      renderElement(mainContainer, statisticsComponent);
      break;
  }
};

const navPresenter = new NavPresenter(navTabsContainer, handleOnNavClick)
createButtonComponent.setOnClickHander(handleOnNavClick);

navPresenter.init();
filterPresenter.init();
tripPresenter.init(descriptions, destinations, options);
