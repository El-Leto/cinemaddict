import MainNavigationView from './view/main-navigation.js';
import SiteSortView from './view/site-sort.js';
import MainContentView from './view/main-content.js';
import AllFilmsView from './view/all-films.js';
import FilmCardView from './view/film-card.js';
import ProfileView from './view/profile.js';
import ShowMoreButtonView from './view/show-more-button.js';
import TopRatedFilmsListView from './view/top-rated-films-list.js';
import MostCommentedFilmsListView from './view/most-commented-films-list.js';
import StatisticsView from './view/statistics.js';
import PopupView from './view/film-details.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { InsertPosition, render } from './utils.js';

const MAX_FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const FilmCount = {
  ALL: 5,
  EXTRA: 2,
};

const films = new Array(MAX_FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteMain = document.querySelector('.main');

render(siteMain, new MainNavigationView(filters).getElement(), InsertPosition.BEFORE_END);
render(siteMain, new SiteSortView().getElement(), InsertPosition.BEFORE_END);

const mainContent = new MainContentView();

render(siteMain, mainContent.getElement(), InsertPosition.BEFORE_END);
render(mainContent.getElement(), new AllFilmsView().getElement(), InsertPosition.BEFORE_END);

const allFilmsList = mainContent.getElement().querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(allFilmsList, new FilmCardView(films[i]).getElement(), InsertPosition.BEFORE_END);
}

const header = document.querySelector('.header');

render(header, new ProfileView().getElement(), InsertPosition.BEFORE_END);

const allFilms = mainContent.getElement().querySelector('.films-list');

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFIlmCount = FILM_COUNT_PER_STEP;

  const showMoreButton = new ShowMoreButtonView();

  render(allFilms, showMoreButton.getElement(), InsertPosition.BEFORE_END);

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFIlmCount, renderedFIlmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(allFilmsList, new FilmCardView(film).getElement(), InsertPosition.BEFORE_END));

    renderedFIlmCount += FILM_COUNT_PER_STEP;

    if (renderedFIlmCount >= films.length) {
      showMoreButton.getElement().remove();
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

const footer = document.querySelector('.footer');

render(footer, new PopupView(films[0]).getElement(), InsertPosition.AFTER_END);
