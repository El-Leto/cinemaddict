import MainNavigationView from '../view/main-navigation.js';
import MainContentView from '../view/main-content.js';
import SiteSortView from '../view/site-sort.js';
import AllFilmsView from '../view/all-films.js';
import AllFilmsListView from '../view/all-films-list.js';
import FilmCardView from '../view/film-card.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import PopupView from '../view/popup.js';
import NoFilmsView from '../view/no-films.js';
//import FilmCardPresenter from './film-card.js';
import { InsertPosition, render } from '../render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;
    this._renderedFIlmCount = FILM_COUNT_PER_STEP;
    this._allFilmsComponent = new AllFilmsView();
    this._allFilmsListComponent = new AllFilmsListView();
    this._mainNavigationComponent = new MainNavigationView();
    this._siteSortComponent = new SiteSortView();
    this._noFilmsComponent = new NoFilmsView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._MainContentComponent = new MainContentView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();

    render(this._filmListContainer, this._MainContentComponent, InsertPosition.BEFORE_END);
    render(this._MainContentComponent, this._allFilmsComponent, InsertPosition.BEFORE_END);
    render(this._allFilmsComponent, this._allFilmsListComponent, InsertPosition.BEFORE_END);
    this._renderFilmList();
  }

  _renderFilmCard(films) {
    const filmCardComponent = new FilmCardView(films);
    const popupComponent = new PopupView(films);

    const handleFilmCardClick = () => {
      document.body.classList.add('hide-overflow');
      document.body.appendChild(popupComponent.getElement());

      const buttonEscKeydownHandler = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          document.body.removeChild(popupComponent.getElement());
          popupComponent.removeElement();
          document.body.classList.remove('hide-overflow');
          document.removeEventListener('keydown', buttonEscKeydownHandler);
        }
      };

      const buttonClose = document.querySelector('.film-details__close-btn');

      buttonClose.addEventListener('click', () => {
        document.body.removeChild(popupComponent.getElement());
        popupComponent.removeElement();
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', buttonEscKeydownHandler);
      });

      document.addEventListener('keydown', buttonEscKeydownHandler);
    };

    filmCardComponent.setPosterClickHandler(handleFilmCardClick);
    filmCardComponent.setTitleClickHandler(handleFilmCardClick);
    filmCardComponent.setCommentsClickHandler(handleFilmCardClick);

    render(this._allFilmsListComponent, filmCardComponent, InsertPosition.BEFORE_END);
    // const filmCardPresenter = new FilmCardPresenter(this._allFilmsListComponent);
    //
    // filmCardPresenter.init(films);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderNoTasks() {
    render(this._filmListContainer, this._noFilmsComponent, InsertPosition.BEFORE_END);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFIlmCount, this._renderedFIlmCount + FILM_COUNT_PER_STEP);
    this._renderedFIlmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFIlmCount >= this._films.length) {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
    }
  }

  _renderShowMoreButton() {
    render(this._allFilmsComponent, this._showMoreButtonComponent, InsertPosition.BEFORE_END);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, FILM_COUNT_PER_STEP);

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmList() {
    if (this._films.length === 0) {
      this._renderNoFilms();
    }

    this._renderFilmsList();
  }
}
