'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Some photos');
});

router.get('/:id', (req, res, next) => {
  // res.send(req.params.id);
  res.render('photo', { id: req.params.id });
});

module.exports = router;