'use strict';

const express = require(`express`);
const {DEFAULT_EXPRESS_PORT} = require(`../constants`);
const authorization = require(`./routes/authorization`);
const advert = require(`./routes/advert`);
const articles = require(`./routes/articles`);
const categories = require(`./routes/search`);
const search = require(`./routes/search`);
const path = require(`path`);

const app = express();
app.set(`view engine`, `pug`);
app.use(express.static(path.join(__dirname, `../../markup`)));
app.set(`views`, path.join(__dirname, `templates`));

app.use(`/`, authorization);
app.use(`/my`, advert);
app.use(`/articles`, articles);
app.use(`/categories`, categories);
app.use(`/search`, search);
app.listen(DEFAULT_EXPRESS_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_EXPRESS_PORT}`));
