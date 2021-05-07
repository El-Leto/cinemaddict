import { EMOJIS } from '../../const.js';
import { formatCommentDate } from '../../utils/data.js';

const getAttributeChecked = (isChecked = false) => {
  return isChecked ? 'checked' : '';
};

const getCommentDate = (date) => {
  const diff = new Date() - date;
  if (diff > 172800000) {
    return formatCommentDate(date);
  }
  if (diff <= 172800000 && diff > 86400000) {
    return '2 days ago';
  }
  if (diff <= 86400000) {
    return 'Today';
  }
};

const createCommentTemplate = (comment) => {
  const {emoji, text, author, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getCommentDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createEmojiTemplate = (emoji, currentEmoji) => {

  return EMOJIS.map((emoji) => {

    const isEmojiCheck = emoji === currentEmoji;

    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji} ${getAttributeChecked(isEmojiCheck)}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}>
      </label>`
    );
  }).join('');
};

const createCommentListTemplate = (film) => {
  const {
    comments, currentEmoji, currentTextComment,
  } = film;

  const commentList = comments.map(createCommentTemplate).join('');
  const emojiList = createEmojiTemplate(EMOJIS, currentEmoji);

  return (
    `<ul class="film-details__comments-list">
      ${commentList}
    </ul>
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
      ${currentEmoji !== '' ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-${currentEmoji}">` : ''}
      </div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${currentTextComment}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </div>`
  );
};

export { createCommentListTemplate };
