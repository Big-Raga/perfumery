const notesColorMap = require('../config/notesConfig');

const parseNotes = (req, res, next) => {
  if (req.body.notes && typeof req.body.notes === 'string') {
    const noteNames = req.body.notes
      .split(',')
      .map(note => note.trim().toLowerCase());
    
    req.body.notes = noteNames.map(noteName => ({
      name: noteName,
      color: notesColorMap[noteName] || '#E0E0E0'
    }));
  }
  next();
};

module.exports = parseNotes;
