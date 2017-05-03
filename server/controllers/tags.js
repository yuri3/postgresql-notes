const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    Tag.create({
      label: req.body.label,
      noteId: req.params.noteId,
      order: req.body.order,
    })
      .then(tag => res.send(tag))
      .catch(error => res.status(400).send(error));
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
