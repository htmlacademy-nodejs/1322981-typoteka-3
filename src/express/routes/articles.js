'use strict';

const {Router} = require(`express`);
const articles = new Router();
const api = require(`../api`).getAPI();
const {CATEGORY, COMMENTS} = require(`../../constants`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const UPLOAD_DIR = `../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articles.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`, {category: CATEGORY}));
articles.get(`/add`, (req, res) => res.render(`articles/new-post`));

articles.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body} = req;
  const articleData = {
    title: body.title,
    createDate: body.createDate,
    announce: body.announce,
    fullText: body.fullText,
    category: []
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
  }
});

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
