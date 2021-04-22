import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import { InsertPosition, render } from '../render.js';

export default class FilmCard {
  constructor(filmCardContainer) {
    this._filmCardContainer = filmCardContainer;
    this._filmCardComponent = null;
    this._popupComponent = null;
  }

  init(films) {
    this._filmCardComponent = new FilmCardView(films);
    this._popupComponent = new PopupView(films);

    this._filmCardComponent.setPosterClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setTitleClickHandler(this._handleFilmCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._handleFilmCardClick);

    render(this._filmCardContainer, this._filmCardComponent, InsertPosition.BEFORE_END);
  }

  _handleFilmCardClick() {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this._popupComponent.getElement()); //не знаю, как тут исправить :(

    const buttonEscKeydownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        document.body.removeChild(this._popupComponent.getElement());
        this._popupComponent.removeElement();
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', buttonEscKeydownHandler);
      }
    };

    const buttonClose = document.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () => {
      document.body.removeChild(this._popupComponent.getElement());
      this._popupComponent.removeElement();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', buttonEscKeydownHandler);
    });

    document.addEventListener('keydown', buttonEscKeydownHandler);
  }
}
