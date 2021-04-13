import { createButtonCloseTemplate, createTableTemplate, createControlsTemplate, createCommentListTemplate } from './film-details/index.js';

export const createPopupTemplate = (film) => {
  const {
    comments,
  } = film;

  return (
    `<section class="film-details visually-hidden">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          ${createButtonCloseTemplate()}
          ${createTableTemplate(film)}
          ${createControlsTemplate(film)}
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            ${createCommentListTemplate(film)}
          </section>
        </div>
      </form>
    </section>`
  );
};