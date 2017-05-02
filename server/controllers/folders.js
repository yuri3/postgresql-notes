const Folder = require('../models').Folder;
const Note = require('../models').Note;
const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    let promise;
    if(req.body.name === 'New Folder') {
      promise = Folder.create({
        parentId: req.body.parentId,
        order: req.body.order,
        name: req.body.name,
      });
    } else {
      promise = Folder.create({
        order: req.body.order,
        name: req.body.name,
      });
    }
    return promise
      .then(folder => res.send(folder))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Folder.findAll({
      order: [
        ['order', 'DESC']
      ]
    })
      .then(folders => res.send(folders))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Folder.findById(req.body.id)
      .then(folder => {
        if(!folder) {
          return res.status(404).send({
            message: 'Folder Not Found',
          });
        }
        return folder.update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.send(folder))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  moveFolder(req, res) {
  },
  destroy(req, res) {
    return Folder.findById(req.body.id)
      .then(folder => {
        if(!folder) {
          return res.status(404).send({
            message: 'Folder Not Found',
          });
        }
        return folder.destroy()
          .then(() => res.send({
            id: req.body.id,
            parentId: req.body.parentId,
            message: 'Folder deleted successfully.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
