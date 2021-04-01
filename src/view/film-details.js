export const createPopupTemplate = () => {
  return (
    `<section class="film-details visually-hidden">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
          </section>
        </div>
      </form>
    </section>`
  );
};
