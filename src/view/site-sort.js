import AbstractView from './abstract.js';
import { SortType } from '../const.js';

const createSortTemplate = (condition, type, name) => (
  `<li><a href="#" class="sort__button ${condition}" data-sort-type="${type}">Sort by ${name}</a></li>`
);

const createSiteSortTemplate = (inicialSortType) => {
  return (
    `<ul class="sort">
      ${createSortTemplate(`${inicialSortType === SortType.DEFAULT ? 'sort__button--active' : ''}`, `${SortType.DEFAULT}`, 'default')}
      ${createSortTemplate(`${inicialSortType === SortType.BY_DATE ? 'sort__button--active' : ''}`, `${SortType.BY_DATE}`, 'date')}
      ${createSortTemplate(`${inicialSortType === SortType.BY_RATING ? 'sort__button--active' : ''}`, `${SortType.BY_RATING}`, 'rating')}
    </ul>`
  );
};

export default class SiteSort extends AbstractView {
  constructor(inicialSortType) {
    super();

    this._inicialSortType = inicialSortType;

    this._sortTypeClickHandler = this._sortTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteSortTemplate(this._inicialSortType);
  }

  setSortTypeClickHandler(callback) {
    this._callback.clickSortType = callback;
    this.getElement().addEventListener('click', this._sortTypeClickHandler);
  }

  _removeButtonActive() {
    this.getElement().querySelector('.sort__button.sort__button--active').classList.remove('sort__button--active');
  }

  _sortTypeClickHandler(evt) {
    const target = evt.target;
    if (target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    if (!target.classList.contains('sort__button--active')) {
      this._removeButtonActive();
      target.classList.add('sort__button--active');
    }

    this._callback.clickSortType(target.dataset.sortType);
  }
}
