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
  MAX_COUNT,
  ExitCode,
  THREE_MONTH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_ID_LENGTH,
  MAX_COMMENTS
} = require(`../../constants`);
const {nanoid} = require(`nanoid`);

module.exports = {
  name: `--generate`,
  async run(args, process) {
    const currentDate = new Date();
    const pastDate = new Date(currentDate - THREE_MONTH);

    const generateComments = (count, comments) => (
      Array(count).fill({}).map(() => ({
        id: nanoid(MAX_ID_LENGTH),
        text: shuffle(comments)
          .slice(0, getRandomInt(1, 3))
          .join(` `),
      }))
    );

    const generateOffers = (count, titles, categories, sentences) => (
      Array(count).fill({}).map(() => ({
        id: nanoid(MAX_ID_LENGTH),
        title: titles[getRandomInt(0, titles.length - 1)],
        createDate: getRandomDate(pastDate, currentDate),
        announce: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(` `),
        fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
        category: shuffle(categories).slice(getRandomInt(1, categories.length - 1)),
        comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
      }))
    );

    const readContent = async (filePath) => {
      try {
        const content = await fs.readFile(filePath, `utf8`);
        return content.split(`\n`).slice(0, -1);
      } catch (err) {
        console.error(chalk.red(err));
        return [];
      }
    };

    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_COUNT) {
      console.info(`Не больше 1000 объявлений`);
      return process.exit(ExitCode.success);
    }
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));
    try {
      await fs.writeFile(FILE_NAME, content);
      return console.info(chalk.green(`Файл создан.`));
    } catch (err) {
      console.error(chalk.red(`Не смог записать данные в файл.`));
      return process.exit(ExitCode.failure);
    }
  }
};
