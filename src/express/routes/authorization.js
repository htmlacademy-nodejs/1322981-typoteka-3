'use strict';

const {Router} = require(`express`);
const authorization = new Router();
const {CATEGORY, COMMENTS, MOST_DISCUSS} = require(`../../constants`);

authorization.get(`/`, (req, res) => res.render(`authorization/main`, {category: CATEGORY, mostDiscuss: MOST_DISCUSS, comments: COMMENTS}));
authorization.get(`/register`, (req, res) => res.render(`authorization/login`));
authorization.get(`/login`, (req, res) => res.render(`authorization/login`));

module.exports = authorization;
