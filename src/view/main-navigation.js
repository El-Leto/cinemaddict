//import { getСapitalLetter }  from '../utils/common.js';
import {FilterType} from '../const.js';
import AbstractView from './abstract.js';

const createMainNavigationItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" data-type ="${type}">${name === FilterType.ALL_MOVIES
      ? FilterType.ALL_MOVIES
      : `${name} <span class="main-navigation__item-count">${count} </span>`}</a>`
  );
};

const createMainNavigationTemplate = (items, currentFilterType) => {
  const filterItemsTemplate = items
    .map((filter) => createMainNavigationItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._currentFilter);
  }

  _filterTypeClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFilterType(evt.target.dataset.type);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.clickFilterType = callback;
    this.getElement().addEventListener('click', this._filterTypeClickHandler);
  }
}
