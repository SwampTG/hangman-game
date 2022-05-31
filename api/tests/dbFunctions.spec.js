/* eslint-disable node/no-unpublished-import */
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';

var db = require('./../src/utils/dbFunctions');
var conn = require('./../src/config/database');
var gameCollection = {};
var userCollection = {};

describe('The database is correctly manipulated', () => {
	beforeEach(function stablishCollections() {
		gameCollection = db.getGameCollection();
		userCollection = db.getUserCollection();
	});

	it('connects correctly', (done) => {
		userCollection
			.insertOne({ name: 'test' })
			.then((result) => {
				console.info(result);

				expect(gameCollection.conn.readyState).to.be.equal(1);
                expect(userCollection.conn.readyState).to.be.equal(1);
                
                done();
			})
			.catch((err) => {
				console.error(err);
			});
	});

	it('has models', () => {
		let usersSchema =
			conn.getDefaultConnection().models['hangman_user'].schema.obj;
		let gameSchema =
			conn.getDefaultConnection().models['hangman_game'].schema.obj;

		expect(usersSchema).to.not.empty;
		expect(gameSchema).to.not.empty;
	});

	it('has the correct game database', () => {
		expect(gameCollection.name).to.be.equal(
			process.env.HANGMAN_GAME_COLLECTION
		);
	});

	it('has the correct user database', () => {
		expect(userCollection.name).to.be.equal(
			process.env.HANGMAN_USER_COLLECTION
		);
	});
});
