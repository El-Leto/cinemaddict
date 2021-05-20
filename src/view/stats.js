import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import { TimeRange } from '../const.js';
import { getRankName, filterWatchedFilmsInRange } from '../utils/statistics.js';

const BAR_HEIGHT = 50;
const BG_COLOR = '#ffe800';
const HOVER_BG_COLOR = '#ffe800';
const FONT_SIZE = 20;
const FONT_COLOR = '#ffffff';
const OFFSET = 40;
const TICKS_PADDING = 100;
const BAR_THICKNESS = 24;

const getSortedfFilms = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.isWatched);

  const filmsGenres = watchedFilms.reduce((prev, curr) => {
    return [...prev, ...curr.filmInfo.genres];
  }, []);

  const filmsByGenreCounts = filmsGenres.reduce((acc, rec) => {
    return (typeof acc[rec] !== 'undefined')
      ? { ...acc, [rec]: acc[rec] + 1 }
      : { ...acc, [rec]: 1 };
  }, {});

  const sortedFilmByGenreCounts = Object.entries(filmsByGenreCounts).map(([ key, val ]) => ({ key, counts: val })).sort((a, b) => b.counts - a.counts);
  return sortedFilmByGenreCounts ? sortedFilmByGenreCounts : [];
};

const getTopGenre = (films) => {
  if (!films.length) {
    return '';
  }

  const countFilmsByGenre = getSortedfFilms(films);
  return countFilmsByGenre.length ? countFilmsByGenre[0].key : '';
};

const renderChart = (statisticCtx, films) => {
  const genres = getSortedfFilms(films).map((a) => a.key);
  const counts = getSortedfFilms(films).map((a) => a.counts);

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
          barThickness: BAR_THICKNESS,
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

const getTotalWatchedTime = (films) => {
  if (!films) {
    return '0';
  }

  return films.reduce((counter, film) => {
    return counter + film.filmInfo.runtime;
  }, 0);
};

const createStatsTemplate = ({films, range}, filteredMovies) => {
  const rankName = getRankName(films);
  const watchedFilms = filteredMovies.filter((film) => film.userDetails.isWatched);
  const watchedMoviesCount = watchedFilms.length;
  const totalWatchedTimeInMin = getTotalWatchedTime(watchedFilms);
  const hours = Math.floor(totalWatchedTimeInMin / 60 );
  const minutes = Math.floor(totalWatchedTimeInMin) - (hours * 60);
  const topGenre = getTopGenre(filteredMovies);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankName}</span>
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
          <p class="statistic__item-text">${watchedMoviesCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
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
