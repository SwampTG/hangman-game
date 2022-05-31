/* eslint-disable node/no-unpublished-import */
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';

var gameDb = require('../src/lib/gameDb');
var stubs = {};

describe('The system must manage game info', () => {
	function Game(
		word,
		chosenLetters,
		owner,
		players,
		turnsPassed,
		max,
		createdAt,
		startedAt
	) {
		this.word = word;
		this.chosenLetters = chosenLetters;
		this.owner = owner;
		this.players = players;
		this.turnsPassed = turnsPassed;
		this.max = max;
		this.createdAt = createdAt;
		this.startedAt = startedAt;
	}

	beforeEach(() => {
		stubs.collectStub = sinon.stub(
			mongoose.Connection.prototype,
			'collection'
		);
	});

	afterEach(() => {
		stubs.collectStub.restore();
	});

	it('creates a game', async () => {
		stubs.collectStub.returns({
			insertOne: function () {
				return {
					insertedId: 10,
				};
			},
		});

		let newGame = new Game('Test', [], {}, [], 0, 5, Date.now(), {});
		// createSpy..then((createSpy) => {
		let idInserted = (await gameDb.createGame(newGame)).insertedId;
		expect(idInserted).to.be.equal(10);
		expect(stubs.collectStub.called).to.be.true;
	});
});
