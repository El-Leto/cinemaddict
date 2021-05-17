import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const createMainNavigationItemTemplate = (filter, inicialFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${type === inicialFilterType ? 'main-navigation__item--active' : ''}"
    data-type ="${type}">
    ${type === FilterType.ALL_MOVIES
      ? FilterType.ALL_MOVIES
      : `${name} <span class="main-navigation__item-count">${count} </span>`}
  </a>`
  );
};

const createMainNavigationTemplate = (items, inicialFilterType) => {
  const filterItemsTemplate = items
    .map((filter) => createMainNavigationItemTemplate(filter, inicialFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
  constructor(filters, inicialFilterType) {
    super();
    this._filters = filters;
    this._inicialFilterType = inicialFilterType;

    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._inicialFilterType);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.clickFilterType = callback;
    this.getElement().querySelector('.main-navigation__items').addEventListener('click', this._filterTypeClickHandler);
  }

  _filterTypeClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName != 'A') {
      return;
    }
    this._callback.clickFilterType(evt.target.dataset.type);
  }
}
