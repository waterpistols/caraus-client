const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../dist')));
app.set('views', path.join(__dirname, 'views'));

app.use((req, res) => {
    res.render('index', {
        livereloadJs: 'livereload.js'
    });
});

module.exports = app;
