const express = require('express');

const notesRouter = ('./notes.js');

const app = express();

app.use('./notes', notesRouter);

module.exports = app;