const Folder = require('../models').Folder;

module.exports = {
  create(req, res) {
    Folder.findAll({}).then(folders => {
      if(
        folders.some(folder =>
          folder && !folder.parentId &&
          !req.body.parentId && folder.name === req.body.name)
      ) {
        res.status(400).send({message: 'This name is already taken!'});
      } else if(
        folders.some(folder =>
          folder && folder.parentId &&
          folder.parentId === Number.parseInt(req.body.parentId, 10) &&
          req.body.name !== 'New Folder' &&
          folder.name === req.body.name)
      ) {
        res.status(400).send({message: 'This name is already taken!'});
      } else if(
        folders.some(folder =>
        folder && req.body.parentId &&
        folder.name !== 'New Folder' &&
        folder.name === req.body.name)
      ) {
        res.status(400).send({message: 'This name is already taken!'});
      } else {
        let promise;
        if(req.body.name === 'New Folder') {
          promise = Folder.create({
            parentId: req.body.parentId,
            name: req.body.name,
          });
        } else {
          promise = Folder.create({
            name: req.body.name,
          });
        }
        return promise
          .then(folder => res.send(folder))
          .catch(error => res.status(400).send(error));
      }
    });
  },
  list(req, res) {
    Folder.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(folders => res.send(folders))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    Folder.findById(req.body.id)
      .then(folder => {
        if(!folder) {
          res.status(404).send({
            message: 'Folder Not Found',
          });
        }
        folder.update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.send(folder))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    Folder.findById(req.body.id)
      .then(folder => {
        if(!folder) {
          res.status(404).send({
            message: 'Folder Not Found',
          });
        }
        folder.destroy()
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
