import MainContentView from '../view/main-content.js';
import AllFilmsView from '../view/all-films.js';
import AllFilmsListView from '../view/all-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmsView from '../view/no-films.js';
import FilmCardPresenter from './film-card.js';
import { InsertPosition, render, remove } from '../utils/render.js';
import { updateItemById } from '../utils/common.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(container) {
    this._container = container;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._allFilmsView = new AllFilmsView();
    this._allFilmsListView = new AllFilmsListView();
    this._noFilmsView = new NoFilmsView();
    this._showMoreButtonView = new ShowMoreButtonView();
    this._MainContentView = new MainContentView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmCardPresenter = {};
  }

  init(films) {
    this._films = films.slice();

    render(this._container, this._MainContentView, InsertPosition.BEFORE_END);
    render(this._MainContentView, this._allFilmsView, InsertPosition.BEFORE_END);
    this._renderFilmsList();
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

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilms() {
    render(this._container, this._noFilmsView, InsertPosition.BEFORE_END);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    render(this._allFilmsView, this._showMoreButtonView, InsertPosition.BEFORE_END);

    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, FILM_COUNT_PER_STEP);
    render(this._allFilmsView, this._allFilmsListView, InsertPosition.BEFORE_END);

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _render() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmsList();
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
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
  }
}
