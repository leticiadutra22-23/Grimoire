var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cristais', { title: 'Grimoire' });
});

module.exports = router;
