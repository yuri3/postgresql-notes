const foldersController = require('../controllers').folders;
const notesController = require('../controllers').notes;
const tagsController = require('../controllers').tags;

module.exports = (app) => {
  app.post('/folders', foldersController.create);
  app.get('/folders', foldersController.list);
  app.put('/folders', foldersController.update);
  app.put('/folders/drag', foldersController.moveFolder);
  app.delete('/folders', foldersController.destroy);

  app.post('/notes/:folderId', notesController.create);
  app.get('/notes/:folderId', notesController.list);
  app.delete('/notes/:folderId', notesController.destroy);

  app.get('/notes/:folderId/:noteId', notesController.retrieve);
  app.put('/notes/:folderId/:noteId', notesController.update);

  app.post('/tags/:folderId/:noteId', tagsController.create);
  app.get('/tags/:folderId/:noteId/tags', tagsController.list);
  app.delete('/tags/:folderId/:noteId/tags', tagsController.destroy);
};
