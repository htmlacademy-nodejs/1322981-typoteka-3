'use strict';

const {Router} = require(`express`);
const articles = new Router();
const api = require(`../api`).getAPI();
const {CATEGORY, COMMENTS} = require(`../../constants`);

articles.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`, {category: CATEGORY}));
articles.get(`/add`, (req, res) => res.render(`articles/new-post`));

articles.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [articlesPosts, categories] = await Promise.all([
    api.getArticles(id),
    api.getCategories()
  ]);
  res.send(`/articles/edit/:id`, {articlesPosts, categories});
});

articles.get(`/:id`, (req, res) => res.render(`articles/post`, {category: CATEGORY, comments: COMMENTS}));

module.exports = articles;
