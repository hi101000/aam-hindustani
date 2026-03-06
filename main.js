const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const { Redis } = require("@upstash/redis");

require('dotenv').config({ path: './.env.local' });

const redis = Redis.fromEnv();

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'static')));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    res.render('index.njk');
});

app.get('/test', async (req, res) => {
    try {
        const result = await redis.get("Articles");
        res.send(`Value from Redis: ${result}`);
    } catch (error) {
        console.error('Error interacting with Redis:', error);
        res.status(500).send('Error interacting with Redis');
    }
});

app.listen(port, () => {
    console.log(`Aam Hindustani app listening at http://localhost:${port}`);
});