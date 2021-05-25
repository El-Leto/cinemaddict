import dayjs from 'dayjs';
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

  update(update) {
    const index = this._items.findIndex((item) => item.id === item.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting comment');
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1),
    ];

    this._notify(update);
  }

  delete(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting item');
    }

    this._items = [
      ...this._items.slice(0, index),
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, this._items);
  }

  add(updateType, update) {
    this._items = update;
    this._notify(updateType, this._items);
  }

  static adaptToClient(film) {
    const comments = film.comments ? film.comments : film;

    const adaptedComments = comments.map((comment) => {
      const adaptedComment = Object.assign(
        {},
        comment,
        {
          date: dayjs(comment.date).valueOf(),
          text: comment.comment,
          emoji: comment.emotion,
        });

      delete adaptedComment.comment;
      delete adaptedComment.emotion;

      return adaptedComment;
    });

    return adaptedComments;
  }

  static adaptToServer(comments) {
    const adaptedComments = Object.assign(
      {},
      comments,
      {
        comment: comments.text,
        emotion: comments.emoji,
      });

    delete adaptedComments.text;
    delete adaptedComments.emoji;

    return adaptedComments;
  }
}
