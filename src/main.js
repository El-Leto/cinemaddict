import ProfileView from './view/profile.js';
//import TopRatedFilmsListView from './view/top-rated-films-list.js';
//import MostCommentedFilmsListView from './view/most-commented-films-list.js';
import StatisticsView from './view/statistics.js';
import { generateFilm } from './mock/film.js';
import { render } from './utils/render.js';
import FilmsListPresenter from './presenter/films-list.js';
import FilterPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';

const MAX_FILM_COUNT = 20;

// const FilmCount = {
//   ALL: 5,
//   EXTRA: 2,
// };

const films = new Array(MAX_FILM_COUNT).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.set(films);

const filterModel = new FilterModel();

const siteMain = document.querySelector('.main');
const header = document.querySelector('.header');

render(header, new ProfileView());

const filmsListPresenter = new FilmsListPresenter(siteMain, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMain, filterModel, filmsModel);

filterPresenter.init();
filmsListPresenter.init();

// const createTopRatedFilmsListTemplate = () => {
//   const allFilmsListView = new AllFilmsListView();
//
//   for (let i = 0; i < FilmCount.EXTRA; i++) {
//     render(allFilmsListView, new FilmCardView(films[i]), InsertPosition.BEFORE_END);
//   }
//
//   const topRatedFilmsListView = new TopRatedFilmsListView();
//
//   render(mainContentView, topRatedFilmsListView, InsertPosition.BEFORE_END);
//   render(topRatedFilmsListView, allFilmsListView, InsertPosition.BEFORE_END);
// };
//
// const renderTopRatedFilmsList = (films) => {
//   films.length === 0 ? '' : createTopRatedFilmsListTemplate();
// };
//
// renderTopRatedFilmsList(films);
//
// const createMostCommentedFilmsListTemplate = () => {
//   const allFilmsListView = new AllFilmsListView();
//
//   for (let i = 0; i < FilmCount.EXTRA; i++) {
//     render(allFilmsListView, new FilmCardView(films[i]), InsertPosition.BEFORE_END);
//   }
//
//   const mostCommentedFilmsListView = new MostCommentedFilmsListView();
//
//   render(mainContentView, mostCommentedFilmsListView, InsertPosition.BEFORE_END);
//   render(mostCommentedFilmsListView, allFilmsListView, InsertPosition.BEFORE_END);
// };
//
// const renderMostCommentedFilmsList = (films) => {
//   films.length === 0 ? '' : createMostCommentedFilmsListTemplate();
// };
//
// renderMostCommentedFilmsList(films);

const statistics = document.querySelector('.footer__statistics');

render(statistics, new StatisticsView(MAX_FILM_COUNT));
