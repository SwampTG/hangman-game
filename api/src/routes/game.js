var express = require('express');
var service = require('./../services/gameService');

let router = express.Router();

router.post('/', service.createGame);
router.get('/', service.getAll);
router.get('/:id', service.findById);

module.exports = router;
