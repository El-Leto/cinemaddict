import { createMainNavigationTemplate } from './view/main-navigation.js';
import { createSiteSortTemplate } from './view/site-sort.js';
import { createMainContentTemplate } from './view/main-content.js';
import { createAllFilmsTemplate } from './view/all-films.js';
import { createFilmCardTemplate } from './view/film-card.js';
import { createProfileTemplate } from './view/profile.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createTopRatedFilmsListTemplate } from './view/top-rated-films-list.js';
import { createMostCommentedFilmsListTemplate } from './view/most-commented-films-list.js';
import { createStatisticsTemplate } from './view/statistics.js';
import { createPopupTemplate } from './view/film-details.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';

const MAX_FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const FilmCount = {
  ALL: 5,
  EXTRA: 2,
};

const InsertPosition = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const films = new Array(MAX_FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMain = document.querySelector('.main');

render(siteMain, createMainNavigationTemplate(filters), InsertPosition.BEFORE_END);
render(siteMain, createSiteSortTemplate(), InsertPosition.BEFORE_END);
render(siteMain, createMainContentTemplate(), InsertPosition.BEFORE_END);

const mainContent = siteMain.querySelector('.films');

render(mainContent, createAllFilmsTemplate(), InsertPosition.BEFORE_END);

const allFilmsList = mainContent.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(allFilmsList, createFilmCardTemplate(films[i]), InsertPosition.BEFORE_END);
}

const header = document.querySelector('.header');

render(header, createProfileTemplate(), InsertPosition.BEFORE_END);

const allFilms = mainContent.querySelector('.films-list');

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFIlmCount = FILM_COUNT_PER_STEP;

  render(allFilms, createShowMoreButtonTemplate(), InsertPosition.BEFORE_END);

  const showMoreButton = allFilms.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFIlmCount, renderedFIlmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(allFilmsList, createFilmCardTemplate(film), InsertPosition.BEFORE_END));

    renderedFIlmCount += FILM_COUNT_PER_STEP;

    if (renderedFIlmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(mainContent, createTopRatedFilmsListTemplate(), InsertPosition.BEFORE_END);

const topRatedContent = mainContent.querySelector('.films-list--top-rated');
const topRatedList = topRatedContent.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  render(topRatedList, createFilmCardTemplate(films[i]), InsertPosition.BEFORE_END);
}

render(mainContent, createMostCommentedFilmsListTemplate(), InsertPosition.BEFORE_END);

const mostCommentedContent = mainContent.querySelector('.films-list--most-commented');
const mostCommentedList = mostCommentedContent.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  render(mostCommentedList, createFilmCardTemplate(films[i]), InsertPosition.BEFORE_END);
}

const statistics = document.querySelector('.footer__statistics');

render(statistics, createStatisticsTemplate(MAX_FILM_COUNT), InsertPosition.BEFORE_END);

const footer = document.querySelector('.footer');

render(footer, createPopupTemplate(films[0]), InsertPosition.AFTER_END);
