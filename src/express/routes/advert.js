'use strict';

const {Router} = require(`express`);
const advert = new Router();
const api = require(`../api`).getAPI();

advert.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`advert/my`, {articles});
});

advert.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`advert/comments`, {comments: articles});
});

module.exports = advert;
