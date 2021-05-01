import MainContentView from '../view/main-content.js';
import AllFilmsView from '../view/all-films.js';
import AllFilmsListView from '../view/all-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmsView from '../view/no-films.js';
import FilmCardPresenter from './film-card.js';
import SiteSort from '../view/site-sort.js';
import { render, remove } from '../utils/render.js';
import { updateItemById, sortByDate, sortByRating } from '../utils/common.js';
import { SortType } from '../const.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(container) {
    this._container = container;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._siteSortView = new SiteSort();
    this._allFilmsView = new AllFilmsView();
    this._allFilmsListView = new AllFilmsListView();
    this._noFilmsView = new NoFilmsView();
    this._showMoreButtonView = new ShowMoreButtonView();
    this._MainContentView = new MainContentView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmCardPresenter = {};
    this._currentSortType = SortType.DEFAULT;
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._render();
    render(this._container, this._MainContentView);
    render(this._MainContentView, this._allFilmsView);
  }

  _handleModeChange() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(this._allFilmsListView, this._handleFilmChange, this._handleModeChange);

    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);

    this._clear();
    this._renderAllFilms();
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilms() {
    render(this._container, this._noFilmsView);
  }

  _renderSort() {
    render(this._container, this._siteSortView);
    this._siteSortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    render(this._allFilmsView, this._showMoreButtonView);

    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderAllFilms() {
    this._renderFilms(0, FILM_COUNT_PER_STEP);
    render(this._allFilmsView, this._allFilmsListView);

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _render() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderAllFilms();
  }

  _clear() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonView);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItemById(this._films, updatedFilm);
    this._sourcedFilms = updateItemById(this._sourcedFilms, updatedFilm);
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }
}
