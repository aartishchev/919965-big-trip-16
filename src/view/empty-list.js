import AbstractView from '../view/abstract-view.js';
import { EmptyFilterMsg, FilterType } from '../utils/const.js';

const createEmpyListTemplate = (filterType) => {
  const emptyListTextValue = EmptyFilterMsg[filterType];

  return (
    `<p class="trip-events__msg">${emptyListTextValue}</p>`
  );
};

export default class EmptyListMsg extends AbstractView {
  constructor (data = FilterType.EVERYTHING) {
    super();
    this._data = data;
  }

  get template() {
    return createEmpyListTemplate(this._data);
  }
}
