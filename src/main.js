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
import NoFilmsView from './view/no-films.js';
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
  const filmCardView = new FilmCardView(films);
  const popupView = new PopupView(films);

  const handleFilmCardClick = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(popupView.getElement());

    const handleButtonEscKeydown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        document.body.removeChild(popupView.getElement());
        popupView.removeElement();
        document.body.classList.remove('hide-overflow');
        document.removeEventListener('keydown', handleButtonEscKeydown);
      }
    };

    const buttonClose = document.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () => {
      document.body.removeChild(popupView.getElement());
      popupView.removeElement();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', handleButtonEscKeydown);
    });

    document.addEventListener('keydown', handleButtonEscKeydown);
  };

  filmCardView.setPosterClickHandler(handleFilmCardClick);
  filmCardView.setTitleClickHandler(handleFilmCardClick);
  filmCardView.setCommentsClickHandler(handleFilmCardClick);

  render(container, filmCardView.getElement(), InsertPosition.BEFORE_END);
};

render(siteMain, new MainNavigationView(filters).getElement(), InsertPosition.BEFORE_END);
render(siteMain, new SiteSortView().getElement(), InsertPosition.BEFORE_END);

const mainContent = new MainContentView();

render(siteMain, mainContent.getElement(), InsertPosition.BEFORE_END);

const allFilms = new AllFilmsView();
const noFilms = new NoFilmsView();

const renderFilmList = () => {
  if (films.length === 0) {
    render(mainContent.getElement(), noFilms.getElement(), InsertPosition.BEFORE_END);
  }
  render(mainContent.getElement(), allFilms.getElement(), InsertPosition.BEFORE_END);
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

    showMoreButton.setClickHandler(() => {
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
};

renderFilmList();

const createTopRatedFilmsListTemplate = () => {
  const allFilmsList = new AllFilmsListView();

  for (let i = 0; i < FilmCount.EXTRA; i++) {
    render(allFilmsList.getElement(), new FilmCardView(films[i]).getElement(), InsertPosition.BEFORE_END);
  }

  const topRatedFilmsListView = new TopRatedFilmsListView();

  render(mainContent.getElement(), topRatedFilmsListView.getElement(), InsertPosition.BEFORE_END);
  render(topRatedFilmsListView.getElement(), allFilmsList.getElement(), InsertPosition.BEFORE_END);
};

const renderTopRatedFilmsList = (films) => {
  films.length === 0 ? '' : createTopRatedFilmsListTemplate();
};

renderTopRatedFilmsList(films);

const createMostCommentedFilmsListTemplate = () => {
  const allFilmsList = new AllFilmsListView();

  for (let i = 0; i < FilmCount.EXTRA; i++) {
    render(allFilmsList.getElement(), new FilmCardView(films[i]).getElement(), InsertPosition.BEFORE_END);
  }

  const mostCommentedFilmsList = new MostCommentedFilmsListView();

  render(mainContent.getElement(), mostCommentedFilmsList.getElement(), InsertPosition.BEFORE_END);
  render(mostCommentedFilmsList.getElement(), allFilmsList.getElement(), InsertPosition.BEFORE_END);
};

const renderMostCommentedFilmsList = (films) => {
  films.length === 0 ? '' : createMostCommentedFilmsListTemplate();
};

renderMostCommentedFilmsList(films);

const statistics = document.querySelector('.footer__statistics');

render(statistics, new StatisticsView(MAX_FILM_COUNT).getElement(), InsertPosition.BEFORE_END);
