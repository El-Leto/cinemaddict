import MainNavigationView from '../view/main-navigation.js';
import {render, replace, remove} from '../utils/render.js';
import {filterTypeToFilterFilms} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._model = filterModel;
    this._filmsModel = filmsModel;

    this._view = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleItemTypeClick = this._handleItemTypeClick.bind(this);

    this._filmsModel.subscribe(this._handleModelEvent);
    this._model.subscribe(this._handleModelEvent);
  }

  init() {
    const filters = this._get();
    const prevFilter = this._view;

    this._view = new MainNavigationView(filters, this._model.get());
    this._view.setFilterTypeClickHandler(this._handleItemTypeClick);

    if (prevFilter === null) {
      render(this._container, this._view);
      return;
    }

    replace(this._view, prevFilter);
    remove(prevFilter);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleItemTypeClick(filterType) {
    if (this._model.get() === filterType) {
      return;
    }

    this._model.set(UpdateType.MAJOR, filterType);
  }

  _get() {
    const films = this._filmsModel.get();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'All Movies',
        count: '',
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
