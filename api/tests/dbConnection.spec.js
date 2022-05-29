/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-import */
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
const database = require('./../src/config/database');

const dbUri =
	`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/`.concat(
		`${process.env.MONGO_TEST_DATABASE}`
	);

var mongoConn = {};
var host = process.env.MONGO_DB_HOST;
var port = process.env.MONGO_DB_PORT;
var db = process.env.MONGO_TEST_DATABASE;

beforeEach(async function connectToDatabase() {
	database.initDb();
	mongoConn = database.getDefaultConnection();
});

describe('Server must interact with Mongo database', () => {
	it('Mounts the database uri', () => {
		expect(database.mountDbUri(host, port, db)).to.equal(dbUri);
	});
	it('Connects without errors', () => {
		expect(mongoConn.readyState).to.equal(1);
	});
	it('Creates and uses the specified collection', async () => {
		mongoConn
			.collection(process.env.MONGO_TEST_DATABASE)
			.insertOne({ name: 'test' });
		mongoConn.db.collections({}, (_err, collects) => {
			expectCollectionsNames(collects);
		});
	});
});
