import MainNavigationView from './view/main-navigation.js';
import SiteSortView from './view/site-sort.js';
import MainContentView from './view/main-content.js';
import AllFilmsView from './view/all-films.js';
import AllFilmsListView from './view/all-films-list.js';
import FilmCardView from './view/film-card.js';
import ProfileView from './view/profile.js';
import ShowMoreButtonView from './view/show-more-button.js';
import TopRatedFilmsListView from './view/top-rated-films-list.js';
import MostCommentedFilmsListView from './view/most-commented-films-list.js';
import StatisticsView from './view/statistics.js';
import PopupView from './view/popup.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { InsertPosition, render } from './render.js';

const MAX_FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const FilmCount = {
  ALL: 5,
  EXTRA: 2,
};

const films = new Array(MAX_FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteMain = document.querySelector('.main');

const renderFilmCard = (container, films) => {
  const filmCardView = new FilmCardView(films).getElement();
  const popupView = new PopupView(films);

  const filmCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(popupView.getElement());

    const buttonClose = document.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () =>{
      document.body.removeChild(popupView.getElement());
      popupView.removeElement();
      document.body.classList.remove('hide-overflow');
    });
  };

  filmCardView.querySelector('.film-card__poster').addEventListener('click', filmCardClickHandler);
  filmCardView.querySelector('.film-card__title').addEventListener('click', filmCardClickHandler);
  filmCardView.querySelector('.film-card__comments').addEventListener('click', filmCardClickHandler);

  render(container, filmCardView, InsertPosition.BEFORE_END);
};

render(siteMain, new MainNavigationView(filters).getElement(), InsertPosition.BEFORE_END);
render(siteMain, new SiteSortView().getElement(), InsertPosition.BEFORE_END);

const mainContent = new MainContentView();

render(siteMain, mainContent.getElement(), InsertPosition.BEFORE_END);

const allFilms = new AllFilmsView();

render(mainContent.getElement(), allFilms.getElement(), InsertPosition.BEFORE_END);

const allFilmsList = new AllFilmsListView();

render(allFilms.getElement(), allFilmsList.getElement(), InsertPosition.BEFORE_END);

films
  .slice(0, FILM_COUNT_PER_STEP)
  .forEach((films) => renderFilmCard(allFilmsList.getElement(), films));

const header = document.querySelector('.header');

render(header, new ProfileView().getElement(), InsertPosition.BEFORE_END);

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFIlmCount = FILM_COUNT_PER_STEP;

  const showMoreButton = new ShowMoreButtonView();

  render(allFilms.getElement(), showMoreButton.getElement(), InsertPosition.BEFORE_END);

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFIlmCount, renderedFIlmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(allFilmsList.getElement(), new FilmCardView(film).getElement(), InsertPosition.BEFORE_END));

    renderedFIlmCount += FILM_COUNT_PER_STEP;

    if (renderedFIlmCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
}

render(mainContent.getElement(), new TopRatedFilmsListView().getElement(), InsertPosition.BEFORE_END);

const topRatedContent = mainContent.getElement().querySelector('.films-list--top-rated');
const topRatedList = topRatedContent.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  render(topRatedList, new FilmCardView(films[i]).getElement(), InsertPosition.BEFORE_END);
}

render(mainContent.getElement(), new MostCommentedFilmsListView().getElement(), InsertPosition.BEFORE_END);

const mostCommentedContent = mainContent.getElement().querySelector('.films-list--most-commented');
const mostCommentedList = mostCommentedContent.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  render(mostCommentedList, new FilmCardView(films[i]).getElement(), InsertPosition.BEFORE_END);
}

const statistics = document.querySelector('.footer__statistics');

render(statistics, new StatisticsView(MAX_FILM_COUNT).getElement(), InsertPosition.BEFORE_END);
