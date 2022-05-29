const mongoose = require('mongoose');
var models = require('../schemas/models');
var loadEnv = require('./env');

const { gameSchema, userSchema } = require('./../schemas/schemas');

loadEnv.get();

var dbHost = process.env.MONGO_DB_HOST;
var dbPort = process.env.MONGO_DB_PORT;
var dbName = process.env.MONGO_DB_CONNECTION;
var userDb = process.env.HANGMAN_USER_COLLECTION;
var gameDb = process.env.HANGMAN_GAME_COLLECTION;

var defaultConnection = new mongoose.Connection();
export function mountDbUri(host, port, name) {
	return `mongodb://${host}:${port}/${name}`;
}

export function connect(dbUri) {
	return mongoose.createConnection(dbUri);
}

export async function defaultConnect() {
	return connect(mountDbUri(dbHost, dbPort, dbName)).asPromise();
}

export function getCollections() {
	return {
		game: getDefaultConnection().collection(gameDb),
		user: getDefaultConnection().collection(userDb),
	};
}

export function registerModels() {
	models.registerModels(gameDb, gameSchema);
	models.registerModels(userDb, userSchema);
}

export function configCollections() {
	try {
		registerModels();
	} catch (exception) {
		console.error('Error on database connection', exception);
	}
}

export function initDb() {
	defaultConnect()
		.then((conn) => {
			defaultConnection = conn;
			configCollections();
		})
		.catch((err) => console.log(err));
}

export function getDefaultConnection() {
	return defaultConnection;
}
