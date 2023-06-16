const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/;id', (req, res) => {
  // Add query to get all genres
  const idToFind = req.params.id;
  const queryText = `SELECT "genres"."name" as genre
  FROM "genres"
  JOIN "movies_genres" ON "genres"."id" = "movies_genres"."genre_id"
  JOIN "movies" on "movies"."id" = "movies_genres"."movie_id"
  WHERE "movies"."id" = $1;
  `
  pool.query(queryText, [idToFind]).then(result => {
    res.send(result.rows);
  }).catch(err => {
    res.sendStatus(500)
    console.log('Error with genres', err);
  })

  
});

module.exports = router;