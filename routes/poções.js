var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('poções', { title: 'Grimoire' });
});

module.exports = router;
