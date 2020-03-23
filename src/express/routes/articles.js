'use strict';

const {Router} = require(`express`);
const articles = new Router();

articles.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));
articles.get(`/add`, (req, res) => res.send(`/articles/add`));
articles.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articles.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = articles;
