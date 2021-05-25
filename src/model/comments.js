import Observer from '../utils/observer.js';

export default class Comments extends Observer {
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

  update(comments) {
    const index = this._items.findIndex((item) => item.id === item.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting comment');
    }

    this._items = [
      ...this._items.slice(0, index),
      comments,
      ...this._items.slice(index + 1),
    ];

    this._notify(comments);
  }

  delete(updateType, comments) {
    const index = this._items.findIndex((item) => item.id === comments.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting item');
    }

    this._items = [
      ...this._items.slice(0, index),
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, this._items);
  }

  add(updateType, comments) {
    this._items = comments;
    this._notify(updateType, this._items);
  }

  static adaptToClient(film) {
    const comments = film.comments ? film.comments : film;

    const adaptedComments = comments.map((comment) => {
      const adaptedComment = {
        id: comment.id,
        author: comment.author,
        date: comment.date !== null
          ? new Date(comment.date)
          : comment.date,
        text: comment.comment,
        emoji: comment.emotion,
      };
      return adaptedComment;
    });
    return adaptedComments;
  }

  static adaptToServer(comment) {
    return {
      'id': comment.id,
      'author': comment.author,
      'date': comment.date instanceof Date ? comment.date.toISOString() : null,
      'comment': comment.text,
      'emotion': comment.emoji,
    };
  }
}
