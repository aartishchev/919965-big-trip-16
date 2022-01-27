import { POINT_TYPES } from './const';
import { getDuration } from './event';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export function getTypesTotalValues (events) {
  return POINT_TYPES.map((eventType) => {
    const typeTotalValues = events.reduce((acc, { type, basePrice, dateFrom, dateTo }) => {
      if (type === eventType) {
        acc.totalCount++;
        acc.totalPrice += Number(basePrice);
        acc.totalDuration += getDuration(dateFrom, dateTo);

        return acc;
      }

      return acc;
    }, { totalPrice: 0, totalCount: 0, totalDuration: 0 });

    return { eventType, ...typeTotalValues };
  });
}

export function renderChart (chartLabel, ctx, typeLabels, typeValues, formatter) {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: typeLabels,
      datasets: [
        {
          data: typeValues,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter
        }
      },
      title: {
        display: true,
        text: chartLabel,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
}
