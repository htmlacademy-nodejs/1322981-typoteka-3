'use strict';

const {Router} = require(`express`);
const advert = new Router();
const {COMMENTS} = require(`../../constants`);

advert.get(`/`, (req, res) => res.render(`advert/my`, {comments: COMMENTS}));
advert.get(`/comments`, (req, res) => res.render(`advert/comments`, {comments: COMMENTS}));

module.exports = advert;
