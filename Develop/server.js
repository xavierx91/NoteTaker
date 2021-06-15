const fs = require('fs');
const notes = [{

}]
const express = require('express');
const path = require('path');
const {
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const id = 0;
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));
app.post(`/api/notes`, (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv1();
  notes.push(newNote);
  //reads the file 
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let currentData = JSON.parse(data);
    currentData.push(newNote);
    //writes the file
    fs.writeFile('./db/db.json', JSON.stringify(currentData), (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('written sucessfully')
      }
    })
  })
})
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
