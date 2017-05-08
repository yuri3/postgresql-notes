const storage = require('../controllers/search');

const search = (req, res) => {
  const {deepQ, q} = req.query;
  if(deepQ === '') {
    res.send({
      notes: {count: 0, rows: []},
      tags: {count: 0, rows: []},
    });
  }
  if(q === '') {
    res.send({
      notes: {count: 0, rows: []},
    });
  }
  storage.search(req.query)
    .then(result => res.send(result))
    .catch(() => res.status(400).send({error: 'Error'}));
};

module.exports = {
  search,
};
