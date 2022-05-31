const dbFunctions = require('./../utils/dbFunctions');

export async function createGame(gameObj) {
    return dbFunctions.getGameCollection().insertOne(gameObj);
}

export function findGameByWord(word) {
    return dbFunctions.getGameCollection().find({ word: word });
}