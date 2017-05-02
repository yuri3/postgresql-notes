const storage = require('../controllers/search');

const search = async (req, res) => {
  console.log(req.query);
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
  try {
    res.send(await storage.search(req.query))
  } catch(e) {
    res.status(400).send({error: 'Error'});
  }
};

module.exports = {
  search,
};
