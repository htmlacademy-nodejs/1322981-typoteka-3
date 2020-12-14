'use strict';

const express = require(`express`);
const request = require(`supertest`);
const articles = require(`./articles`);
const DataService = require(`../data-service/articles`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `2QOGZE`,
    "title": `Лучше рок-музыканты 20-века`,
    "createDate": `2020-09-27 19:22:13`,
    "announce": `Он написал больше 30 хитов. Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "category": [
      `Разное`,
      `Деревья`,
      `IT`,
      `Программирование`
    ],
    "comments": [
      {
        "id": `lmHztR`,
        "text": `Плюсую, но слишком много буквы! Согласен с автором!`
      },
      {
        "id": `7CMZ6f`,
        "text": `Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!`
      }
    ]
  },
  {
    "id": `kT9b6A`,
    "title": `Ёлки. История деревьев`,
    "createDate": `2020-10-15 06:59:37`,
    "announce": `Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "category": [
      `Без рамки`,
      `За жизнь`,
      `Музыка`,
      `Программирование`,
      `Железо`,
      `Деревья`,
      `IT`
    ],
    "comments": [
      {
        "id": `OZTCne`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `Rm5b47`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `-fq44b`,
        "text": `Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `bnkHsZ`,
        "text": `Согласен с автором!`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 2 articles`, () => expect(response.body.length).toBe(2));

  test(`First offer's id equals "2QOGZE"`, () => expect(response.body[0].id).toBe(`2QOGZE`));

});

describe(`API returns an articles with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/2QOGZE`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Лучше рок-музыканты 20-века"`, () => expect(response.body.title).toBe(`Лучше рок-музыканты 20-века`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    category: `Проверки`,
    title: `Проверочное название`,
    announce: `Проверка анонса`,
    fullText: `Проверка полного текста`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);

    test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

    test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

    const expectResultWhenOfferCreated = (res) => {
      return expect(res.body.length).toBe(2);
    };

    test(`Articles count is changed`, () => request(app)
      .get(`/articles`)
      .expect((res) => {
        expectResultWhenOfferCreated(res);
      })
    );

  });

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    category: `Проверки`,
    title: `Проверочное название`,
    announce: `Проверка анонса`,
    fullText: `Проверка полного текста`
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badOffer = {...newArticle};
      delete badOffer[key];
      await request(app)
        .post(`/articles`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent offer`, () => {

  const newArticle = {
    category: `Проверки`,
    title: `Проверочное название`,
    announce: `Проверка анонса`,
    fullText: `Проверка полного текста`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/2QOGZE`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/2QOGZE`)
    .expect((res) => expect(res.body.title).toBe(`Проверочное название`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    announce: `обьект`,
    fullText: `Проверка полного текста`
  };

  return request(app)
    .put(`/articles/2QOtZE`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `валидный`,
    announce: `обьект`
  };

  return request(app)
    .put(`/articles/2QOGZE`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/kT9b6A`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`kT9b6A`));

  test(`Article count is 0 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(5))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/2QOGZE/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));

  test(`First comment's id is "lmHztR"`, () => expect(response.body[0].id).toBe(`lmHztR`));

});

describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/2QOGZE/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/2QOGZE/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/2yOGzE/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/2QOGZE/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/2QOGZE/comments/lmHztR`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`lmHztR`));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/articles/2QOGZE/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/2QOGZE/comments/NOetST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NrEXGT/comments/kqME9j`)
    .expect(HttpCode.NOT_FOUND);

});
