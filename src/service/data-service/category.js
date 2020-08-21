'use strict';

class CategoryService {
  constructor(article) {
    this._article = article;
  }

  findAll() {
    const categories = this._article.reduce((acc, _article) => {
      acc.add(..._article.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
