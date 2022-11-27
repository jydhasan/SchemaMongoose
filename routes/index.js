var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/zahid', function (req, res, next) {
  res.render('zahid', { zahid: 'zahid hasan' });
});

module.exports = router;
