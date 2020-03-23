'use strict';

const {Router} = require(`express`);
const categories = new Router();

categories.get(`/`, (req, res) => res.send(`/categories`));

module.exports = articles;
