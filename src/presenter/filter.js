import MainNavigationView from '../view/main-navigation.js';
import {render, replace, remove} from '../utils/render.js';
import {filterTypeToFilterFilms} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._itemModel = filterModel;
    this._filmsModel = filmsModel;

    this._item = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleItemTypeClick = this._handleItemTypeClick.bind(this);

    this._filmsModel.addMonitorver(this._handleModelEvent);
    this._itemModel.addMonitorver(this._handleModelEvent);
  }

  init() {
    const filters = this._get();
    const prevFilter = this._item;

    this._item = new MainNavigationView(filters, this._itemModel.get());
    this._item.setFilterTypeClickHandler(this._handleItemTypeClick);

    if (prevFilter === null) {
      render(this._container, this._item);
      return;
    }

    replace(this._item, prevFilter);
    remove(prevFilter);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleItemTypeClick(filterType) {
    if (this._itemModel.get() === filterType) {
      return;
    }

    this._itemModel.set(UpdateType.MAJOR, filterType);
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
