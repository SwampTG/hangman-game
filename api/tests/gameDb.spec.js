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

	it('searches at the database by id', () => {
		stubs.collectStub.returns({
			findOne({ id = 500 }) {
				return { _id: 500 + id };
			},
		});

		gameDb
			.findGameById({ id: 60 })
			.then(data => {
				expect(data._id).to.be.equals(560)
			})
			.catch(err => { console.error(err) })

		expect(stubs.collectStub.calledTwice).to.be.true;
	});

	it('searches at the database by word', () => {
		stubs.collectStub.returns({
			find({ word = 'test' }) {
				return [{ _id: 500, word: word }];
			},
		});

		gameDb
			.findGameByWord({ word: 'antetegemon' })
			.forEach(data => {
				expect(data._id).to.be.equals(500)
				expect(data.word).to.contain({ word: 'antetegemon' });
			});


		expect(stubs.collectStub.calledTwice).to.be.true;
	});

	const toArray = sinon.stub().returns([
		{ _id: 500, word: 'word' },
		{ _id: 10, word: 'test' },
	])

	it('gets all the games', (done) => {
		stubs.collectStub.returns({
			find() {
				return { toArray };
			},
		});

		gameDb
			.getAll()
			.then((data) => {
				expect(Array.isArray(data)).to.be.true;
				expect(data.length).to.be.greaterThanOrEqual(2);
				let mapData = data.map(dt => dt.word);
				expect(mapData).to.contain('word');
				done();
			})
			.catch((err) => {
				console.error(err);
			});

		expect(stubs.collectStub.calledTwice).to.be.true;
	});

	it('removes a game by id', () => {
		stubs.collectStub.returns({
			deleteOne(id) {
				return id;
			}
		});
		console.log(gameDb.deleteGameById(15));
		expect(gameDb.deleteGameById(15)).to.eql({
			_id: 15,
		});
		expect(stubs.collectStub.called).to.be.true;
	})
});
