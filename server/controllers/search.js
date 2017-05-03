const Note = require('../models').Note;
const Tag = require('../models').Tag;

module.exports = {
  search: async (q) => {
    const prop = Object.keys(q)[0];
    const notes = Note.findAndCountAll({
      where: {
        name: {
          $iLike: `%${q[prop]}%`,
        }
      },
      order: [
        ['createdAt', 'DESC']
      ],
      row: true
    });
    if(prop === 'deepQ') {
      const tags = Tag.findAndCountAll({
        where: {
          label: {
            $iLike: `%${q[prop]}%`,
          }
        },
        order: [
          ['createdAt', 'DESC']
        ],
        row: true
      });
      return Promise.all([notes, tags]).then(([notes, tags]) => {
        return {
          notes: notes,
          tags: tags
        };
      });
    } else {
      return Promise.resolve(notes).then(notes => {
        return {
          notes: notes,
        };
      });
    }
  }
};
