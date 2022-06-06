import mongoose from 'mongoose';

var gameDb = require('./../lib/gameDb');

export function createGame(req, res) {
	gameDb
		.createGame(req.body)
		.then((data) => {
			console.log(data);
			res.send(data);
		})
		.catch(errorHandler.bind(res));
}

export function findById(req, res) {
	gameDb
		.findGameById({ _id: mongoose.Types.ObjectId(req.params.id) })
		.then((data) => {
			console.log(data);
			res.send(data);
		})
		.catch(errorHandler.bind(res));
}

export function findByWord(req, res) {
	console.log(req.query.word);
	gameDb
		.findGameByWord(req.query.word)
		.toArray()
		.then((gameBuf) => {
			res.send(gameBuf);
		});
}

export function getAll(_req, res) {
	gameDb
		.getAll()
		.then((data) => res.send(data))
		.catch(errorHandler.bind(res));
}

export function deleteById(req, res) {
	gameDb
		.deleteGameById(mongoose.Types.ObjectId(req.params.id))
		.then((data) => res.send(data))
		.catch(errorHandler.bind(res));
}

export function update(req, res) {
	gameDb
		.update(req.body)
		.then((data) => {
			res.send(data);
		})
		.catch(errorHandler.bind(res));
}

function errorHandler(err) {
	console.log(err);
	this.status(400).send(`Error ${400}: ${err}`);
}
