'use strict';

const {Router} = require(`express`);
const articles = new Router();
const {CATEGORY, COMMENTS} = require(`../../constants`);

articles.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`, {category: CATEGORY}));
articles.get(`/add`, (req, res) => res.render(`articles/new-post`));
articles.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articles.get(`/:id`, (req, res) => res.render(`articles/post`, {category: CATEGORY, comments: COMMENTS}));

module.exports = articles;
