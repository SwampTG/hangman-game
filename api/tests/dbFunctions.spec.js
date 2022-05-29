/* eslint-disable node/no-unpublished-import */
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';

var db = require('./../src/utils/dbFunctions');
var gameCollection = {};
var userCollection = {};

describe('The database is correctly manipulated', () => {
	beforeEach(function stablishCollections() {
		db.initDb();
		gameCollection = db.getGameCollection();
		userCollection = db.getUserCollection();
	});

	it('connects correctly', () => {
		expect(gameCollection.conn.readyState).to.be.equal(1);
		expect(userCollection.conn.readyState).to.be.equal(1);
	});

	it('has the correct game database', () => {
		expect(gameCollection.name).to.be.equal(
			process.env.MONGO_DB_DATABASE
		);
	});

	it('has the correct user database', () => {
		expect(userCollection.name).to.be.equal(process.env.HANGMAN_USER_DB);
	});
});
