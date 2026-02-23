const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'static')));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log(`Aam Hindustani app listening at http://localhost:${port}`);
});