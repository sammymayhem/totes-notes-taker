const notes = require('express').Router();
const res = require('express/lib/response');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    console.log(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:notes_id', (req, res) => {
    const notesId = req.params.notes_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.notes_id === notesId);
        return result.length > 0
          ? res.json(result)
          : res.json('No notes with that ID');
      });
  });

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);
  
    const { title, text, uuid } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        tip_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
  
  module.exports = notes;