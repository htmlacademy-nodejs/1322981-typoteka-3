'use strict';

const express = require(`express`);
const {DEFAULT_EXPRESS_PORT} = require(`../constants`);
const authorization = require(`./routes/authorization`);
const advert = require(`./routes/advert`);
const articles = require(`./routes/articles`);
const search = require(`./routes/search`);

const app = express();

app.use(`/`, authorization);
app.use(`/my`, advert);
app.use(`/articles`, articles);
app.use(`/search`, search);
app.listen(DEFAULT_EXPRESS_PORT,
    () => console.log(`Сервер запущен на порту: ${DEFAULT_EXPRESS_PORT}`));
