import MainNavigationView from '../view/main-navigation.js';
import {render, replace, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filter = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeClick = this._handleFilterTypeClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilter = this._filter;

    this._filter = new MainNavigationView(filters, this._filterModel.getFilter());
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
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.WATHCLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATHCLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
