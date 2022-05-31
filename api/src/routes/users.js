var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/', function(_req, res) {
  res.send('respond with a resource');
});

router.put('/new', (req, res, next) => {
  res.send(`Status ${res.status}: Trying to create user`);
  next(app.collection.insertOne(req.body));
})

module.exports = router;
