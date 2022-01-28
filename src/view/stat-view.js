import SmartView from './smart-view.js';
import { renderChart, getTypesTotalValues } from '../utils/statistics.js';
import { POINT_TYPES, STAT_BAR_HEIGHT, ChartLabel } from '../utils/const.js';
import { formatDuration } from '../utils/event.js';

const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>`
);

export default class StatView extends SmartView {
  #events = null;

  constructor(events) {
    super();
    this.#events = events;
    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate();
  }

  #setCharts = () => {
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    moneyCtx.height = STAT_BAR_HEIGHT * POINT_TYPES.length;
    typeCtx.height = STAT_BAR_HEIGHT * POINT_TYPES.length;
    timeCtx.height = STAT_BAR_HEIGHT * POINT_TYPES.length;

    const typesTotalValues = getTypesTotalValues(this.#events);
    const typeLabels = typesTotalValues.map((el) => el.eventType.toUpperCase());
    const totalTypesPrice = typesTotalValues.map((type) => type.totalPrice);
    const totalTypesCount = typesTotalValues.map((type) => type.totalCount);
    const totalTypesDuration = typesTotalValues.map((type) => type.totalDuration);

    const moneyFormatter = (val) => `€ ${val}`;
    const countFormatter = (val) => `${val}x`;
    const timeFormatter = (val) => formatDuration(val);

    renderChart(ChartLabel.MONEY, moneyCtx, typeLabels, totalTypesPrice, moneyFormatter);
    renderChart(ChartLabel.TYPE, typeCtx, typeLabels, totalTypesCount, countFormatter);
    renderChart(ChartLabel.TIME, timeCtx, typeLabels, totalTypesDuration, timeFormatter);
  };
}