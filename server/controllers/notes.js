const Note = require('../models').Note;
const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    return Note.create({
      name: req.body.name,
      description: req.body.description,
      order: req.body.order,
      folderId: req.params.folderId,
    })
      .then(note => res.send(note))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    let promise;
    if(req.params.folderId !== 'null') {
      promise = Note.findAll({
        where: {
          folderId: req.params.folderId,
        },
        order: [
          ['order', 'DESC']
        ],
      });
    } else {
      promise = Note.findAll({
        order: [
          ['order', 'DESC']
        ],
      });
    }
    return promise
      .then(notes => {
        console.log('notes');
        res.send(notes)
      })
      .catch(error => res.status(400).send(error))
  },
  retrieve(req, res) {
    return Note.findOne({
      where: {
        folderId: req.params.folderId,
        id: req.params.noteId,
      },
    })
      .then(note => {
        if(!note) {
          return res.status(404).send({
            message: 'Note Not Found',
          });
        }
        return res.send(note);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Note.findById(req.params.noteId)
      .then(note => {
        if(!note) {
          return res.status(404).send({
            message: 'Note Not Found',
          });
        }
        return note.update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.send(note))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Note.findById(req.body.id)
      .then(note => {
        if(!note) {
          return res.status(404).send({
            message: 'Note Not Found',
          });
        }
        return note.destroy()
          .then(() => res.send({
            id: req.body.id,
            message: 'Note deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
