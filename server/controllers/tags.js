const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    return Tag.create({
      label: req.body.label,
      noteId: req.params.noteId,
      order: req.body.order,
    })
      .then(tag => res.send(tag))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    let promise;
    if(req.params.noteId !== 'null') {
      promise = Tag.findAll({
        where: {
          noteId: req.params.noteId,
        },
      });
    } else {
      promise = Tag.findAll({});
    }
    return promise
      .then(tags => res.send(tags))
      .catch(error => res.status(400).send(error))
  },
  destroy(req, res) {
    return Tag.findById(req.body.id)
      .then(tag => {
        if(!tag) {
          return res.status(404).send({
            message: 'Tag Not Found',
          });
        }
        return tag.destroy()
          .then(() => res.send({
            id: req.body.id,
            message: 'Tag deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
