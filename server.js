const express = require('express');
const path = require('path');
const fs = require('fa');
const uuid = require('uuid');


const PORT = process.env.PORT || 3001;

const app = express();

// Use middlware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './db/db.json'))
);

app.post('/api/notes', (req, res) => {
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

// to delete note
app.delete('/api/notes/:id', (req, res) => {
    const deleteNote = note.filter((delNote) => delNote.id !== req.params.id);
    fs.writeFileSync('.db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
});

// routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.listen(PORT, () => {
    console.log('Now Listening')
})