import { createSiteNavigationTemplate } from './view/site-navigation.js';
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
import { createButtonCloseTemplate } from './view/film-details-button-close.js';
import { createInfoWrapTemplate } from './view/film-details-info-wrap.js';
import { createPosterTemplate } from './view/film-details-poster.js';
import { createInfoTemplate } from './view/film-details-info.js';
import { createControlsTemplate } from './view/film-details-controls.js';
import { createCommentsListTemplate } from './view/comments-list.js';
import { createNewCommentTemplate } from './view/new-comment.js';

const FilmCount = {
  ALL: 5,
  EXTRA: 2,
};

const InsertPosition = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMain = document.querySelector('.main');

render(siteMain, createSiteNavigationTemplate(), InsertPosition.BEFORE_END);
render(siteMain, createSiteSortTemplate(), InsertPosition.BEFORE_END);
render(siteMain, createMainContentTemplate(), InsertPosition.BEFORE_END);

const mainContent = siteMain.querySelector('.films');

render(mainContent, createAllFilmsTemplate(), InsertPosition.BEFORE_END);

const allFilmsList = mainContent.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.ALL; i++) {
  render(allFilmsList, createFilmCardTemplate(), InsertPosition.BEFORE_END);
}

const header = document.querySelector('.header');

render(header, createProfileTemplate(), InsertPosition.BEFORE_END);

const allFilms = mainContent.querySelector('.films-list');

render(allFilms, createShowMoreButtonTemplate(), InsertPosition.BEFORE_END);
render(mainContent, createTopRatedFilmsListTemplate(), InsertPosition.BEFORE_END);

const topRatedContent = mainContent.querySelector('.films-list--top-rated');
const topRatedList = topRatedContent.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  render(topRatedList, createFilmCardTemplate(), InsertPosition.BEFORE_END);
}

render(mainContent, createMostCommentedFilmsListTemplate(), InsertPosition.BEFORE_END);

const mostCommentedContent = mainContent.querySelector('.films-list--most-commented');
const mostCommentedList = mostCommentedContent.querySelector('.films-list__container');

for (let i = 0; i < FilmCount.EXTRA; i++) {
  render(mostCommentedList, createFilmCardTemplate(), InsertPosition.BEFORE_END);
}

const statistics = document.querySelector('.footer__statistics');

render(statistics, createStatisticsTemplate(), InsertPosition.BEFORE_END);

const footer = document.querySelector('.footer');

render(footer, createPopupTemplate(), InsertPosition.AFTER_END);

const popupTopContainer = document.querySelector('.film-details__top-container');

render(popupTopContainer, createButtonCloseTemplate(), InsertPosition.BEFORE_END);
render(popupTopContainer, createInfoWrapTemplate(), InsertPosition.BEFORE_END);

const popupInfoWrap = popupTopContainer.querySelector('.film-details__info-wrap');

render(popupInfoWrap, createPosterTemplate(), InsertPosition.BEFORE_END);
render(popupInfoWrap, createInfoTemplate(), InsertPosition.BEFORE_END);
render(popupTopContainer, createControlsTemplate(), InsertPosition.BEFORE_END);

const popupCommentsWrap = document.querySelector('.film-details__comments-wrap');

render(popupCommentsWrap, createCommentsListTemplate(), InsertPosition.BEFORE_END);
render(popupCommentsWrap, createNewCommentTemplate(), InsertPosition.BEFORE_END);
