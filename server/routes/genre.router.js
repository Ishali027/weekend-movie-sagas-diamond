const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  const idToFind = req.params.id;
  const queryText = `SELECT movies.title, genres.name AS genre, movies.id, genres.id AS genres_id
  FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON genres.id = movies_genres.genre_id
  WHERE "movies"."id" = $1;
  `;
  pool.query(queryText, [idToFind])
  .then(result => {
    res.send(result.rows);
  }).catch(err => {
    res.sendStatus(500)
    console.log('Error with genres', err);
  })

  
});

module.exports = router;