import StatsView from '../view/stats.js';
import {render, replace, remove} from '../utils/render.js';
import { TimeRange } from '../const.js';
import {getRankTitle, countWatchedFilms} from '../utils/statistics.js';

export default class Stats {
  constructor(container, filmsModel, profilePresenter) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._profile = profilePresenter;
    this._range = TimeRange.ALL_TIME;

    this._statsView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
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

  _getFilms() {
    return this._filmsModel.get();
  }

  _getStatus() {
    return getRankTitle(countWatchedFilms(this._getFilms()));
  }

  _render() {
    const prevStatsView = this._statsView;
    this._statsView = new StatsView(this._getFilms(), this._profile);

    if (prevStatsView === null) {
      render(this._container, this._statsView);

      return;
    }
    replace(this._statsView, prevStatsView);
    remove(prevStatsView);
  }
}

