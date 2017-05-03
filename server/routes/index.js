const foldersController = require('../controllers/folders');
const notesController = require('../controllers/notes');
const tagsController = require('../controllers/tags');
const searchController = require('./notes');

module.exports = (app) => {
  app.post('/folders', foldersController.create);
  app.get('/folders', foldersController.list);
  app.put('/folders', foldersController.update);
  app.delete('/folders', foldersController.destroy);

  app.get('/notes/search', searchController.search);
  app.post('/notes/:folderId', notesController.create);
  app.get('/notes/:folderId', notesController.list);
  app.delete('/notes/:folderId', notesController.destroy);

  app.get('/notes/:folderId/:noteId', notesController.retrieve);
  app.put('/notes/:folderId/:noteId', notesController.update);

  app.post('/tags/:noteId', tagsController.create);
  app.get('/tags', tagsController.list);
  app.delete('/tags', tagsController.destroy);
};
