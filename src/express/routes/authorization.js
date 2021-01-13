'use strict';

const {Router} = require(`express`);
const authorization = new Router();
const {CATEGORY, MOST_DISCUSS} = require(`../../constants`);
const api = require(`../api`).getAPI();

authorization.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`authorization/main`, {category: CATEGORY, mostDiscuss: MOST_DISCUSS, comments: [], articles});
});

authorization.get(`/register`, (req, res) => res.render(`authorization/login`));
authorization.get(`/login`, (req, res) => res.render(`authorization/login`));

module.exports = authorization;
