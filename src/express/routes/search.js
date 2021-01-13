'use strict';

const {Router} = require(`express`);
const search = new Router();
const api = require(`../api`).getAPI();

search.get(`/`, async (req, res) => {
  try {
    const results = await api.search(req.query.search);

    res.render(`search/search`, {
      results
    });
  } catch (error) {
    res.render(`search/search`, {
      results: []
    });
  }
});

module.exports = search;
