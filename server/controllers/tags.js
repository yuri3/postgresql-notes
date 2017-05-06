const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    Tag.findAll({}).then(tags => {
      if(
        tags.some(tag =>
          tag && tag.noteId === Number.parseInt(req.params.noteId, 10) &&
          tag.label === req.body.label)
      ) {
        res.status(400).send({message: 'This tag is already taken!'});
      } else {
        Tag.create({
          label: req.body.label,
          noteId: req.params.noteId,
        })
          .then(tag => res.send(tag))
          .catch(error => res.status(400).send(error));
      }
    });
  },
  list(req, res) {
    Tag.findAll({})
      .then(tags => res.send(tags))
      .catch(error => res.status(400).send(error))
  },
  destroy(req, res) {
    Tag.findById(req.body.id)
      .then(tag => {
        if(!tag) {
          res.status(404).send({
            message: 'Tag Not Found',
          });
        }
        tag.destroy()
          .then(() => res.send({
            id: req.body.id,
            message: 'Tag deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
