import mongoose from 'mongoose';

var gameDb = require('./../lib/gameDb');

export function createGame(req, res) {
	gameDb
		.createGame(req.body)
		.then((data) => {
			console.log(data);
			res.send(data);
		})
		.catch(errorHandler);
}

export function findById(req, res) {
	gameDb
		.findGameById({ _id: mongoose.Types.ObjectId(req.params.id) })
		.then((data) => {
			console.log(data);
			res.send(data);
		})
		.catch(errorHandler);
}

export function getAll(_req, res) {
	gameDb
		.getAll()
		.then((data) => res.send(data))
		.catch(errorHandler);
}

const errorHandler = (err) => {
	console.log(err);
	this.res.status(400).send(`Error ${400}: ${err}`);
};
