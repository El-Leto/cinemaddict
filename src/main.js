import StatisticsView from './view/statistics.js';
import { render, remove } from './utils/render.js';
import FilmsListPresenter from './presenter/films-list.js';
import FilterPresenter from './presenter/filter.js';
import StatsPresenter from './presenter/stats.js';
import ProfilePresenter from './presenter/profile.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import –°ommentsModel from './model/comments.js';
import { FilterType, UpdateType } from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic 43el27leto1302';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const siteMain = document.querySelector('.main');
const header = document.querySelector('.header');
const statistics = document.querySelector('.footer__statistics');
const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new –°ommentsModel();
const emptyFilmCountView = new StatisticsView(0);

const profilePresenter = new ProfilePresenter(header, filmsModel);
const filmsListPresenter = new FilmsListPresenter(siteMain, filmsModel, filterModel, commentsModel, api);
const filterPresenter = new FilterPresenter(siteMain, filterModel, filmsModel);
const statsPresenter = new StatsPresenter(siteMain, filmsModel, profilePresenter);

const renderApi = () => {
  remove(emptyFilmCountView);
  const filmsCountView = new StatisticsView(filmsModel.get().length);
  render(statistics, filmsCountView);
  profilePresenter.init();
  filterPresenter.setMenuClickHandler(handleSiteMenuClick);
};

const handleSiteMenuClick = (filterType) => {
  switch (filterType) {
    case FilterType.STATISTICS:
      filmsListPresenter.hide();
      statsPresenter.init();
      statsPresenter.show();
      break;
    case FilterType.ALL_MOVIES:
    case FilterType.WATHCLIST:
    case FilterType.FAVORITES:
    case FilterType.HISTORY:
      filmsListPresenter.show();
      statsPresenter.hide();
      break;
  }
};

filterPresenter.init();
filmsListPresenter.init();
statsPresenter.init();
statsPresenter.hide();
render(statistics, emptyFilmCountView);

api.getFilms()
  .then((films) => {
    filmsModel.set(UpdateType.INIT, films);
    renderApi();
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
    renderApi();
  });
