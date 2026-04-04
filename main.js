const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const { Redis } = require("@upstash/redis");

const redis = Redis.fromEnv();

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'static')));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', async (req, res) => {
    const articleDetails = await redis.json.mget(await redis.keys('*'), '$');
    res.render('index.njk', { articles: articleDetails });
});

app.get('/article/:id', async (req, res) => {
    const articleId = req.params.id;
    const article = await redis.get(`article:${articleId}`);
    if (article) {
        res.render('article.njk', { article: JSON.parse(article) });
    } else {
        res.status(404).send('Article not found');
    }
});

app.listen(port, () => {
    console.log(`Aam Hindustani app listening at http://localhost:${port}`);
});