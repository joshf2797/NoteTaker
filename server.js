const express = require('express');
const path = require('path');
const fs = require('fa');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001:
const app = express();

// Use middlware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
use.express(express.static('public'));

app.get('/api/notes', (req, res) => {
    const note = JSON.parse(fs.readFileSync('.db/db.json'));
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        note.push(newNote);

        const response = {
            status: 'success',
            bosy: newNote,
        };
        res.status(207).json(response);
    } else {
        res.status(500).json('Cannot Post Note');
    }
    fs.writeFileSync('.db/db.json', JSON.stringify(note), "utf-8");
    res.json(note);
});