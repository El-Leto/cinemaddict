import { createSiteNavigationTemplate } from './view/site-navigation.js';
import { createSiteSortTemplate } from './view/site-sort.js';
import { createMainContentTemplate } from './view/main-content.js';
import { createAllFilmsTemplate } from './view/all-films.js';
import { createFilmCardTemplate } from './view/film-card.js';
import { createProfileTemplate } from './view/profile.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createTopRatedFilmsListTemplate } from './view/top-rated-films-list.js';
import { createMostCommentedFilmsListTemplate } from './view/most-commented-films-list.js';
import { getStatisticsTemplate } from './view/statistics.js';

const FILM_COUNT_ALL = 5;
const FILM_COUNT_EXTRA = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createSiteNavigationTemplate(), 'beforeend');
render(siteMainElement, createSiteSortTemplate(), 'beforeend');
render(siteMainElement, createMainContentTemplate(), 'beforeend');

const mainContentElement = siteMainElement.querySelector('.films');

render(mainContentElement, createAllFilmsTemplate(), 'beforeend');

const allFilmsListElement = mainContentElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_ALL; i++) {
  render(allFilmsListElement, createFilmCardTemplate(), 'beforeend');
}

const headerElement = document.querySelector('.header');

render(headerElement, createProfileTemplate(), 'beforeend');

const allFilmsElement = mainContentElement.querySelector('.films-list');

render(allFilmsElement, createShowMoreButtonTemplate(), 'beforeend');
render(mainContentElement, createTopRatedFilmsListTemplate(), 'beforeend');

const topRatedContentElement = mainContentElement.querySelector('.films-list--top-rated');
const topRatedListElement = topRatedContentElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(topRatedListElement, createFilmCardTemplate(), 'beforeend');
}

render(mainContentElement, createMostCommentedFilmsListTemplate(), 'beforeend');

const mostCommentedContentElement = mainContentElement.querySelector('.films-list--most-commented');
const mostCommentedListElement = mostCommentedContentElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT_EXTRA; i++) {
  render(mostCommentedListElement, createFilmCardTemplate(), 'beforeend');
}

const statisticsElement = document.querySelector('.footer__statistics');

render(statisticsElement, getStatisticsTemplate(), 'beforeend');
