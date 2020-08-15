'use strict';

const getMockData = require(`../lib/get-mock-data`);
const {Router} = require(`express`);
const category = require(`./category`);
const articles = require(`./articles`);
const search = require(`./search`);
const {
  CategoryService,
  ArticleService,
  CommentService,
  SearchService
} = require(`../data-service`);

const app = new Router();

(async () => {

  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  articles(app, new ArticleService(mockData), new CommentService());
  search(app, new SearchService(mockData));

})();

module.exports = app;
