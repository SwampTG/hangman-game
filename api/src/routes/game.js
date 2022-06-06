var express = require('express');
var service = require('./../services/gameService');

let router = express.Router();

router.get('/', service.getAll);
router.get('/:id', service.findById);
router.get('/q/word', service.findByWord);
router.put('/', service.update);
router.post('/', service.createGame);
router.delete('/:id', service.deleteById);

module.exports = router;
