import MainContentView from '../view/main-content.js';
import AllFilmsView from '../view/all-films.js';
import AllFilmsListView from '../view/all-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmsView from '../view/no-films.js';
import FilmCardPresenter from './film-card.js';
import SiteSort from '../view/site-sort.js';
import { render, remove } from '../utils/render.js';
import { SortType, UpdateType, UserAction } from '../const.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsList {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
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

    this._filmsModel.addMonitorver(this._handleModelEvent);
  }

  init() {
    this._render();
  }

  _get() {
    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return this._filmsModel.get().slice().sort((filmA, filmB) => filmB.date - filmA.date);
      case SortType.BY_RATING:
        return this._filmsModel.get().slice().sort((filmA, filmB) => filmB.totalRating - filmA.totalRating);
    }

    return this._filmsModel.get();
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
    const filmCount = this._get().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._get().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
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
    const films = this._get();
    const filmCount = films.length;

    if (this._get().length === 0) {
      render(this._container, this._mainContentView);
      this._renderNoFilms();
      return;
    }

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
    const filmCount = this._get().length;
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._siteSortView);
    remove(this._noFilmsView);
    remove(this._showMoreButtonView);

    this._renderedFilmCount = (resetRenderedFilmCount) ? FILM_COUNT_PER_STEP : Math.min(filmCount, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE:
        this._filmsModel.update(updateType, update);
        break;
      // case UserAction.UPDATE_COMMENTS:
      //   this._commentsModel.update(updateType, update);
      //   break;
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
        this._filmCardPresenter[data.id]._handleViewClick();
        break;
      case UpdateType.MAJOR:
        this._clear({resetRenderedFilmCount: true, resetSortType: true});
        this._render();
        this._filmCardPresenter[data.id]._handleViewClick();
        break;
    }
  }
}
