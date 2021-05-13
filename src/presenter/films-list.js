import MainContentView from '../view/main-content.js';
import AllFilmsView from '../view/all-films.js';
import AllFilmsListView from '../view/all-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmsView from '../view/no-films.js';
import FilmCardPresenter from './film-card.js';
import SiteSort from '../view/site-sort.js';
import { render, remove } from '../utils/render.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { filterTypeToFilterFilms } from '../utils/filter.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsList {
  constructor(container, filmsModel, filterModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._siteSortView = null;
    this._showMoreButtonView = null;
    this._allFilmsView = new AllFilmsView();
    this._allFilmsListView = new AllFilmsListView();
    this._noFilmsView = new NoFilmsView();
    this._mainContentView = new MainContentView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmCardPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsModel.subscribe(this._handleModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);
  }

  init() {
    this._render();
  }

  _get() {
    const filterType = this._filterModel.get();
    const films = this._filmsModel.get().slice();
    const filtredFilms = filterTypeToFilterFilms[filterType](films);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filtredFilms.sort((filmA, filmB) => filmB.date - filmA.date);
      case SortType.BY_RATING:
        return filtredFilms.sort((filmA, filmB) => filmB.totalRating - filmA.totalRating);
    }

    return filtredFilms;
  }

  _handleModeChange() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(this._allFilmsListView, this._handleViewAction, this._handleModeChange);

    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clear({resetRenderedFilmCount: true});
    this._render();
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilms() {
    render(this._mainContentView, this._noFilmsView);
  }

  _renderSort() {
    if (this._siteSortView !== null) {
      this._siteSortView = null;
    }

    this._siteSortView = new SiteSort(this._currentSortType);
    this._siteSortView.setSortTypeClickHandler(this._handleSortTypeChange);
    render(this._container, this._siteSortView);
  }

  _handleShowMoreButtonClick() {
    const films = this._get();
    const filmCount = films.length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const filmsLists = films.slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(filmsLists);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonView !== null) {
      this._showMoreButtonView = null;
    }

    this._showMoreButtonView = new ShowMoreButtonView();
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);

    render(this._allFilmsView, this._showMoreButtonView);
  }

  _render() {
    if (this._filmsModel.isEmpty()) {
      render(this._container, this._mainContentView);
      this._renderNoFilms();
      return;
    }

    const films = this._get();
    const filmCount = films.length;

    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    render(this._container, this._mainContentView);
    render(this._mainContentView, this._allFilmsView);
    render(this._allFilmsView, this._allFilmsListView);

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _clear({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._siteSortView);
    remove(this._noFilmsView);
    remove(this._showMoreButtonView);

    this._renderedFilmCount = resetRenderedFilmCount ? FILM_COUNT_PER_STEP : Math.min(this._get().length, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE:
        this._filmsModel.update(updateType, update);
        break;
      // case UserAction.ADD_COMMENT:
      //   this._commentsModel.add(updateType, update);
      //   break;
      // case UserAction.DELETE_COMMENT:
      //   this._commentsModel.delete(updateType, update);
      //   break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmCardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clear();
        this._render();
        break;
      case UpdateType.MAJOR:
        this._clear({resetRenderedFilmCount: true, resetSortType: true});
        this._render();
        break;
    }
  }
}
