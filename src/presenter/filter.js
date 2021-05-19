import MainNavigationView from '../view/main-navigation.js';
import {render, replace, remove} from '../utils/render.js';
import {filterTypeToFilterFilms} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class Filter {
  constructor(container, filterModel, filmsModel, statsView, filmsListPresenter) {
    this._container = container;
    this._model = filterModel;
    this._filmsModel = filmsModel;
    this._stats = statsView;
    this._filmsListPresenter = filmsListPresenter;

    this._view = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleItemTypeClick = this._handleItemTypeClick.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._model.subscribe(this._handleModelEvent);
  }

  init() {
    const filters = this._get();
    const prevFilter = this._view;

    this._view = new MainNavigationView(filters, this._model.getType());
    this._view.setFilterTypeClickHandler(this._handleItemTypeClick);
    this._view.setStatsClickHandler(this._handleStatsClick);

    if (prevFilter === null) {
      render(this._container, this._view);
      return;
    }

    replace(this._view, prevFilter);
    remove(prevFilter);
  }

  _handleStatsClick() {
    this._filmsListPresenter.hide();
    this._stats.show();
  }

  _handleModelEvent() {
    this.init();
  }

  _handleItemTypeClick(filterType) {
    if (this._model.getType() === filterType) {
      return;
    }
    this._filmsListPresenter.show();
    this._stats.hide();
    this._model.set(UpdateType.MAJOR, filterType);
  }

  _get() {
    const films = this._filmsModel.get();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'All Movies',
        count: films.length,
      },
      {
        type: FilterType.WATHCLIST,
        name: 'Watchlist',
        count: filterTypeToFilterFilms[FilterType.WATHCLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filterTypeToFilterFilms[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filterTypeToFilterFilms[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
