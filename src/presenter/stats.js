import StatsView from '../view/stats.js';
import {render, replace, remove} from '../utils/render.js';
import { TimeRange } from '../const.js';
import {getRankTitle, countWatchedFilms} from '../utils/statistics.js';

export default class Stats {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._statsView = null;

    this._films = this._filmsModel.get().slice();
    this._state = {
      films: this._films,
      range: TimeRange.ALL_TIME,
    };

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
  }

  init() {
    this._render();
  }

  show() {
    this._statsView.show();
  }

  hide() {
    this._statsView.hide();
  }

  _handleModelEvent() {
    this.init();
  }

  _getStatus() {
    return getRankTitle(countWatchedFilms(this._films));
  }

  _render() {
    const prevStatsView = this._statsView;
    this._statsView = new StatsView(this._state, this._getStatus());

    if (prevStatsView === null) {
      render(this._container, this._statsView);

      return;
    }
    replace(this._statsView, prevStatsView);
    remove(prevStatsView);
  }
}

