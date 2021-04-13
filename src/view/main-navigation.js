import { getСapitalLetter }  from '../utils.js';

const createMainNavigationItemTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">${getСapitalLetter(name)} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createMainNavigationTemplate = (mainNavigationItems) => {
  const filterItemsTemplate = mainNavigationItems
    .map((filter, index) => createMainNavigationItemTemplate(filter, index === 0))
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