import ProfileView from '../view/profile.js';
import {remove, render, replace}  from '../utils/render.js';
import {getRankTitle, countWatchedFilms} from '../utils/statistics.js';

export default class Profile {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._films = this._filmsModel.get().slice();

    this._profileView = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.subscribe(this._handleModelEvent);
  }

  init() {
    this._render();
  }

  _getStatus() {
    return getRankTitle(countWatchedFilms(this._films));
  }

  _render() {
    const prevProfileView = this._profileView;
    this._profileView = new ProfileView(this._getStatus());

    if (!this._films.length) {
      return;
    }

    if (prevProfileView === null) {
      render(this._container, this._profileView);

      return;
    }

    replace(this._profileView, prevProfileView);
    remove(prevProfileView);
  }

  _handleModelEvent() {
    this.init();
  }
}
