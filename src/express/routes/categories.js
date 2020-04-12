'use strict';

const {Router} = require(`express`);
const categories = new Router();
const {CATEGORY} = require(`../../constants`);

categories.get(`/`, (req, res) => res.render(`categories/all-categories`, {categories: CATEGORY}));

module.exports = categories;
