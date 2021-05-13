import MainNavigationView from '../view/main-navigation.js';
import {render, replace, remove} from '../utils/render.js';
import {filterTypeToFilterFilms} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filter = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeClick = this._handleFilterTypeClick.bind(this);

    this._filmsModel.addMonitorver(this._handleModelEvent);
    this._filterModel.addMonitorver(this._handleModelEvent);
  }

  init() {
    const filters = this._get();
    const prevFilter = this._filter;

    this._filter = new MainNavigationView(filters, this._filterModel.get());
    this._filter.setFilterTypeClickHandler(this._handleFilterTypeClick);

    if (prevFilter === null) {
      render(this._container, this._filter);
      return;
    }

    replace(this._filter, prevFilter);
    remove(prevFilter);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeClick(filterType) {
    if (this._filterModel.get() === filterType) {
      return;
    }

    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _get() {
    const films = this._filmsModel.get();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'All Movies',
        count: filterTypeToFilterFilms[FilterType.ALL_MOVIES](films).length,
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
