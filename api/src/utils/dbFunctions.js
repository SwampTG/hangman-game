const loadEnv = require('./../config/env');
const database = require('./../config/database');

loadEnv.get();

database.registerModels();

export function getHangmanCollectionName(){
	return `${process.env.MONGO_DB_DATABASE}`.toString();
}
export function getUserCollectionName() {
	return `${process.env.HANGMAN_USER_DB}`.toString();
}

export function getGameCollection() {
	return database.getCollections().game;
}
export function getUserCollection() {
	return database.getCollections().user;
}
export function initDb() {
		database.initDb();
}
