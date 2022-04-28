const express = require('express');
const path = require('path');
const api = require('./routes/routes.js');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.all('*', (req,res) => {
    res.status(404).send('<h1>404! Page Not Found <h1>');
});

app.listen(PORT, (req, res) => {
    console.log(`App listening at http://localhost:${PORT}`);
});