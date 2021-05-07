import dayjs from 'dayjs';

const MINUTES_PER_HOUR = 60;

const formatReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');
const formatCommentDate = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/MINUTES_PER_HOUR);
  const minutes = mins % MINUTES_PER_HOUR;
  if (mins > MINUTES_PER_HOUR) {
    return hours + 'h ' + minutes + 'm';
  }

  return minutes + 'm';
};

export { formatReleaseDate, formatCommentDate, getTimeFromMins };
