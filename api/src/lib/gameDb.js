import mongoose from 'mongoose';

const dbFunctions = require('./../utils/dbFunctions');

export async function createGame(gameObj) {
	return dbFunctions.getGameCollection().insertOne(gameObj);
}

export async function findGameById(objId) {
	return dbFunctions.getGameCollection().findOne(objId);
}

export async function getAll() {
	return dbFunctions.getGameCollection().find().toArray();
}

export function findGameByWord(word) {
	return dbFunctions.getGameCollection().find({ word: word });
}

export function update({ _id: id, ...game }) {
	console.log(...game);
	return dbFunctions
		.getGameCollection()
		.findOneAndUpdate(
			{ _id: mongoose.Types.ObjectId(id) },
			{ $set: { ...game } },
			{ new: true }
		);
}

export function deleteGameById(id = NaN) {
	return dbFunctions.getGameCollection().deleteOne({ _id: id });
}
