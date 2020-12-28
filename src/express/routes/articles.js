'use strict';

const {Router} = require(`express`);
const articles = new Router();
const api = require(`../api`).getAPI();
const {CATEGORY, COMMENTS} = require(`../../constants`);

articles.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`, {category: CATEGORY}));
articles.get(`/add`, (req, res) => res.render(`articles/new-post`));

articles.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [articlesPost, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`articles/post`, {articlesPost, categories});
});

articles.get(`/:id`, (req, res) => res.render(`articles/post`, {category: CATEGORY, comments: COMMENTS}));

module.exports = articles;
