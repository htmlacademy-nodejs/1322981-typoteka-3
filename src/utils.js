'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const monthInterval = (startMonth, monthCount) => {
  const maxMonth = 11;
  return Array(monthCount + 1).fill(``).map(() => {
    if (startMonth > maxMonth) {
      startMonth = 0;
    }
    return startMonth++;
  });
};

const getRandomDate = (startDate, endDate) => {
  const year = getRandomInt(startDate.getFullYear(), endDate.getFullYear());
  const monthArray = monthInterval(startDate.getMonth(), 3);
  const month = monthArray[getRandomInt(0, monthArray.length - 1)];
  const day = getRandomInt(0, 30);
  const hour = getRandomInt(0, 23);
  const minutes = getRandomInt(0, 59);
  const seconds = getRandomInt(0, 59);
  const randomDate = new Date(year, month, day, hour, minutes, seconds);
  const formatDates = (date) => {
    if (date < 10) {
      return `0${date}`;
    }
    return date;
  };
  if (randomDate > endDate) {
    return `${endDate.getFullYear()}-${formatDates(endDate.getMonth() + 1)}-${formatDates(endDate.getDate())} ${formatDates(endDate.getHours() + 1)}:${formatDates(endDate.getMinutes() + 1)}:${formatDates(endDate.getSeconds() + 1)}`;
  }
  return `${randomDate.getFullYear()}-${formatDates(randomDate.getMonth() + 1)}-${formatDates(randomDate.getDate())} ${formatDates(randomDate.getHours() + 1)}:${formatDates(randomDate.getMinutes() + 1)}:${formatDates(randomDate.getSeconds() + 1)}`;
};

module.exports = {
  getRandomInt,
  shuffle,
  monthInterval,
  getRandomDate
};
