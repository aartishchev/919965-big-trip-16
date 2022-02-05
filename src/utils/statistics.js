import { ChartColor, POINT_TYPES } from './const';
import { getDuration } from './event';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const ValueTitles = {
  TOTAL_COUNT: 'totalCount',
  TOTAL_PRICE: 'totalPrice',
  TOTAL_DURATION: 'totalDuration'
};

export const getTypesTotalValues = (events) =>
  POINT_TYPES.map((eventType) => {
    const typeTotalValues = events.reduce(
      (acc, { type, basePrice, dateFrom, dateTo }) => {
        if (type === eventType.toLowerCase()) {
          acc[ValueTitles.TOTAL_COUNT]++;
          acc[ValueTitles.TOTAL_PRICE] += Number(basePrice);
          acc[ValueTitles.TOTAL_DURATION] += getDuration(dateFrom, dateTo);

          return acc;
        }

        return acc;
      }, { totalPrice: 0, totalCount: 0, totalDuration: 0 }
    );

    return { eventType, ...typeTotalValues };
  });

export const getTotalValuesSorted = (typesTotalValues, valueType) =>
  typesTotalValues
    .map((typeValues) => ({ type: typeValues.eventType, value: typeValues[valueType] }))
    .sort((aType, bType) => bType.value - aType.value);

export const renderChart = (chartLabel, ctx, sortedTypesByValues, formatter) =>
  new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedTypesByValues.map(({ type }) => type.toUpperCase()),
      datasets: [
        {
          data: sortedTypesByValues.map(({ value }) => value),
          backgroundColor: ChartColor.WHITE,
          hoverBackgroundColor: ChartColor.WHITE,
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: ChartColor.BLACK,
          anchor: 'end',
          align: 'start',
          formatter,
        },
      },
      title: {
        display: true,
        text: chartLabel,
        fontColor: ChartColor.BLACK,
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: ChartColor.BLACK,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
