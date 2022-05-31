const loadEnv = require('./../config/env');
const database = require('./../config/database');

loadEnv.get();

export function getHangmanCollectionName(){
	return `${process.env.HANGMAN_GAME_COLLECTION}`.toString();
}
export function getUserCollectionName() {
	return `${process.env.HANGMAN_USER_COLLECTION}`.toString();
}

export function getGameCollection() {
	return database.getCollections().game;
}
export function getUserCollection() {
	return database.getCollections().user;
}
export function initDb() {
	database.initDb();
	database.registerModels();
}
