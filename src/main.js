import StatView from './view/stat-view.js';
import CreateButtonPresenter from './presenter/create-button-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NavPresenter from './presenter/nav-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import ApiService from './api-service.js';
import { AUTHORIZATION, END_POINT } from './utils/const.js';
import { removeComponent, renderElement } from './utils/render.js';
import { NavItem } from './utils/const.js';
import OptionsModel from './model/options-model.js';
import DestinationsModel from './model/destinations-model.js';

async function main() {
  const mainContainer = document.querySelector('main .page-body__container');
  const tripInfoContainer = document.querySelector('.trip-main');
  const navTabsContainer = document.querySelector('.trip-controls__navigation');
  const filterTabsContainer = document.querySelector('.trip-controls__filters');
  const tripEventsContainer = document.querySelector('.trip-events');

  const filterModel = new FilterModel();
  const eventsModel = new EventsModel(new ApiService(END_POINT, AUTHORIZATION));
  const optionsModel = new OptionsModel(new ApiService(END_POINT, AUTHORIZATION));
  const destinationsModel = new DestinationsModel(new ApiService(END_POINT, AUTHORIZATION));

  const tripInfoPresenter = new TripInfoPresenter(tripInfoContainer, eventsModel);
  const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, filterModel);
  const filterPresenter = new FilterPresenter(filterTabsContainer, filterModel);
  const navPresenter = new NavPresenter(navTabsContainer, handleOnNavClick);
  const createButtonPresenter = new CreateButtonPresenter(tripInfoContainer, handleOnNavClick);

  let statisticsComponent = null;
  let options = [];
  let destinations = [];

  function handleOnNavClick(navItem) {
    switch (navItem) {
      case NavItem.ADD_NEW_EVENT:
        removeComponent(statisticsComponent);
        navPresenter.resetActiveTab();
        filterPresenter.destroy();
        filterPresenter.init();
        tripPresenter.destroy();
        tripPresenter.init(destinations, options);
        tripPresenter.createEvent();
        break;
      case NavItem.EVENTS:
        filterPresenter.init();
        tripPresenter.init(destinations, options);
        removeComponent(statisticsComponent);
        break;
      case NavItem.STATISTICS:
        filterPresenter.destroy();
        tripPresenter.destroy();
        statisticsComponent = new StatView(eventsModel.events);
        renderElement(mainContainer, statisticsComponent);
        break;
    }
  }

  createButtonPresenter.addDisabled();
  tripInfoPresenter.init();
  navPresenter.init();
  filterPresenter.init();

  await optionsModel.init();
  options = optionsModel.options;
  await destinationsModel.init();
  destinations = destinationsModel.destinations;
  tripPresenter.init(destinations, options);

  eventsModel.init().finally(() => {
    createButtonPresenter.removeDisabled();
  });
}

main();
