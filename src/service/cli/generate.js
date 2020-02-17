'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
  getRandomDate
} = require(`../../utils`);
const {
  FILE_NAME,
  DEFAULT_COUNT,
  CATEGORIES,
  SENTENCES,
  TITLES,
  MAX_COUNT,
  ExitCode,
  THREE_MONTH
} = require(`../../constants`);

module.exports = {
  name: `--generate`,
  async run(args, process) {
    const currentDate = new Date();
    const pastDate = new Date(currentDate - THREE_MONTH);
    const generateOffers = (count) => (
      Array(count).fill({}).map(() => ({
        title: TITLES[getRandomInt(0, TITLES.length - 1)],
        createDate: getRandomDate(pastDate, currentDate),
        announce: shuffle(SENTENCES).slice(0, getRandomInt(1, 5)).join(` `),
        fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, SENTENCES.length - 1)).join(` `),
        category: shuffle(CATEGORIES).slice(getRandomInt(1, CATEGORIES.length - 1)),
      }))
    );
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_COUNT) {
      console.info(`Не больше 1000 объявлений`);
      return process.exit(ExitCode.success);
    }
    const content = JSON.stringify(generateOffers(countOffer));
    try {
      await fs.writeFile(FILE_NAME, content);
      return console.info(chalk.green(`Файл создан.`));
    } catch (err) {
      console.error(chalk.red(`Не смог записать данные в файл.`));
      return process.exit(ExitCode.failure);
    }
  }
};
