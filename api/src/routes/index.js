var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(_req, res, _next) {
  res.send({ title: 'Express' });
});

module.exports = router;
