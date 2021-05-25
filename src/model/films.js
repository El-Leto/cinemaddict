import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(updateType, items) {
    this._items = items.slice();
    this._notify(updateType);
  }

  get() {
    return this._items;
  }

  update(updateType, films) {
    const index = this._items.findIndex((item) => item.id === films.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._items = [
      ...this._items.slice(0, index),
      films,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, films);
  }

  isEmpty() {
    return this._items.length === 0;
  }

  static adaptToClient(film) {
    const adaptedFilm = {
      id: film.id,
      comments: film.comments,
      title: film.film_info.title,
      alternativeTitle: film.film_info.alternative_title,
      poster: film.film_info.poster,
      description: film.film_info.description,
      totalRating: film.film_info.total_rating,
      ageRating: film.film_info.age_rating,
      director: film.film_info.director,
      writers: film.film_info.writers,
      actors: film.film_info.actors,
      date: film.film_info.release.date !== null
        ? new Date(film.film_info.release.date)
        : film.film_info.release.date,
      country: film.film_info.release.release_country,
      runtime: film.film_info.runtime,
      genres: film.film_info.genre,
      isWatchlist: film.user_details.watchlist,
      isWatched: film.user_details.already_watched,
      isFavorite: film.user_details.favorite,
      watchingDate: film.user_details.watching_date !== null
        ? new Date(film.user_details.watching_date)
        : film.user_details.watching_date,
    };
    return adaptedFilm;
  }

  static adaptToServer(film) {
    return {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'title': film.title,
        'alternative_title': film.alternativeTitle,
        'poster': film.poster,
        'description': film.description,
        'total_rating': film.totalRating,
        'age_rating': film.ageRating,
        'director': film.director,
        'writers': film.writers,
        'actors': film.actors,
        'release': {
          'date': film.date instanceof Date ? film.date.toISOString() : null,
          'release_country': film.country,
        },
        'runtime': film.runtime,
        'genre': film.genres,
      },
      'user_details': {
        'watchlist': film.isWatchlist,
        'already_watched': film.isWatched,
        'favorite': film.isFavorite,
        'watching_date': film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null,
      },
    };
  }
}
