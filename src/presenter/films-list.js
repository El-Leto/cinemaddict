import MainContentView from '../view/main-content.js';
import AllFilmsView from '../view/all-films.js';
import AllFilmsListView from '../view/all-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmsView from '../view/no-films.js';
import FilmCardPresenter from './film-card.js';
import SiteSort from '../view/site-sort.js';
import { render, remove } from '../utils/render.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(container, filmsModel, commentsModel, filterModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._siteSortView = null;
    this._allFilmsView = new AllFilmsView();
    this._allFilmsListView = new AllFilmsListView();
    this._noFilmsView = new NoFilmsView();
    this._showMoreButtonView = null;
    this._mainContentView = new MainContentView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._filmCardPresenter = {};
    this._currentSortType = SortType.DEFAULT;
  }

  init() {
    this._renderFilmsBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms().slice();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filtredFilms.sort((filmA, filmB) => {return filmB.date - filmA.date;});
      case SortType.BY_RATING:
        return filtredFilms.sort((filmA, filmB) => {return filmB.totalRating - filmA.totalRating;});
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

    this._clearFilmsBoard({resetRenderedFilmCount: true});
    this._renderFilmsBoard();
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
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

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

  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (this._getFilms().length === 0) {
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

  _clearFilmsBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._siteSortView);
    remove(this._noFilmsView);
    remove(this._showMoreButtonView);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, film) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmCardPresenter[film.id].init(film);
        break;
      case UpdateType.MINOR:
        this._clearFilmsBoard();
        this._renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmsBoard();
        break;
    }
  }
}
