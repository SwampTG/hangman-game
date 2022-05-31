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