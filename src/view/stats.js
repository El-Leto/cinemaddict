import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import { TimeRange } from '../const.js';
import { filterWatchedFilmsInRange, watchedFilms, getRankName, countWatchedFilms } from '../utils/statistics.js';
import { getTimeFromMins } from '../utils/format-date.js';

const BAR_HEIGHT = 50;
const BG_COLOR = '#ffe800';
const HOVER_BG_COLOR = '#ffe800';
const FONT_SIZE = 20;
const FONT_COLOR = '#ffffff';
const OFFSET = 40;
const TICKS_PADDING = 100;
const BAR_THICKNESS = 24;
const MINUTES_IN_HOUR = 60;

const reduceGenres = (genres, genre) => {
  const count = genres[genre];
  genres[genre] = count === undefined ? 1 : count + 1;
  return genres;
};

const getWatchedStats = (films) => films
  .reduce((stats, { filmInfo, userDetails }) => {
    if (userDetails.isWatched) {
      stats.watched += 1;
      stats.runtime += filmInfo.runtime;
      stats.genres = filmInfo.genres.reduce(reduceGenres, stats.genres);
    }

    return stats;
  }, { runtime: 0, watched: 0, genres: {} });

const sortedFilmByGenreCounts = (films) => {
  return Object.entries(films).map(([ key, value ]) => ({ key, count: value })).sort((a, b) => b.count - a.count);
};

const renderChart = (statisticCtx, films) => {
  const genresWatchedFilms = getWatchedStats(films).genres;
  const sortedFilms = sortedFilmByGenreCounts(genresWatchedFilms);
  const genres = sortedFilms.map((a) => a.key);
  const counts = sortedFilms.map((a) => a.count);

  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: counts,
        backgroundColor: BG_COLOR,
        hoverBackgroundColor: HOVER_BG_COLOR,
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FONT_SIZE,
          },
          color: FONT_COLOR,
          anchor: 'start',
          align: 'start',
          offset: OFFSET,
          barThickness: BAR_THICKNESS,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: FONT_COLOR,
            padding: TICKS_PADDING,
            fontSize: FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = ({films, range}) => {
  const rankNam = getRankName(countWatchedFilms(films));
  const totalWatchedTimeInMin = getWatchedStats(watchedFilms(films)).runtime;
  //getTimeFromMins(totalWatchedTimeInMin);
  //const hours = /h /;
  //const minutes = /m/;
  //const newarr = getTimeFromMins(totalWatchedTimeInMin).replace(hours, '<span class="statistic__item-description">h</span>');
  //const newarra = getTimeFromMins(newarr).replace(minutes, '<span class="statistic__item-description">m</span>');
  const hours = Math.floor(totalWatchedTimeInMin / MINUTES_IN_HOUR );
  const minutes = Math.floor(totalWatchedTimeInMin) - (hours * MINUTES_IN_HOUR);
  const sortedFilms = getWatchedStats(films);
  const topGenre = (array) => {
    if (Object.keys(array.genres).length !== 0) {
      return Object.keys(array.genres)[0];
    }
    return '';
  };

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankNam}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${TimeRange.ALL_TIME}"${range === TimeRange.ALL_TIME ? ' checked' : ''}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${TimeRange.DAY}"${range === TimeRange.DAY ? ' checked' : ''}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${TimeRange.WEEK}"${range === TimeRange.WEEK ? ' checked' : ''}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${TimeRange.MONTH}"${range === TimeRange.MONTH ? ' checked' : ''}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${TimeRange.YEAR}"${range === TimeRange.YEAR ? ' checked' : ''}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${countWatchedFilms(films)} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre(sortedFilms)}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Stats extends SmartView {
  constructor(films) {
    super();
    this._films = films.slice();
    this._chart = null;
    this._range = TimeRange.ALL_TIME;
    this._state = {
      films: this._films,
      range: TimeRange.ALL_TIME,
    };

    this._setCharts();

    this._statisticFiltersChangeHandler = this._statisticFiltersChangeHandler.bind(this);

    this._setStatisticFilterChangeHandler();
  }

  getTemplate() {
    return createStatsTemplate(this._state, this._getWatchedFilms());
  }

  restoreHandlers() {
    this._setCharts();
    this._setStatisticFilterChangeHandler();
  }

  _getWatchedFilms() {
    return filterWatchedFilmsInRange(this._state);
  }

  _setCharts() {
    if (this._chart !== null) {
      this._chart = null;
    }

    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    this._chart = renderChart(statisticCtx, this._getWatchedFilms());
  }

  _setStatisticFilterChangeHandler() {
    this.getElement()
      .querySelector('.statistic__filters')
      .addEventListener('change', this._statisticFiltersChangeHandler);
  }

  _statisticFiltersChangeHandler(evt) {
    evt.preventDefault();

    const range = evt.target.value;
    this.updateData({
      range: range,
    });
  }
}
