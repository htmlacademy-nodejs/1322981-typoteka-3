'use strict';

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mock.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  success: 0,
  failure: 1,
};

const THREE_MONTH = 1000 * 60 * 60 * 24 * 90;

const DEFAULT_PORT = 3000;
const DEFAULT_EXPRESS_PORT = 8080;

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode,
  MAX_COUNT,
  THREE_MONTH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  DEFAULT_PORT,
  DEFAULT_EXPRESS_PORT
};

module.exports.HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};
