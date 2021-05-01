import dayjs from 'dayjs';

const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}…`
    : text;

const getСapitalLetter = (word) => (
  `${word[0].toUpperCase()}${word.slice(1)}`
);

const updateItemById = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === dateB) {
    return 0;
  }

  if (dateA > dateB) {
    return 1;
  }

  if (dateB > dateA) {
    return -1;
  }
};

const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.date, filmB.date);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmA.date).diff(dayjs(filmB.date));
};

const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.totalRating, filmB.totalRating);

  if (weight !== null) {
    return weight;
  }

  return filmA.totalRating.diff(filmB.totalRating);
};

export { truncateText, getСapitalLetter, updateItemById, sortByDate, sortByRating };
