import { expect } from 'chai';
import database from './../src/config/database';

const dbUri = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/`;

describe('Server must interact with Mongo database', () => {
	let host = process.env.MONGO_DB_HOST;
	let port = process.env.MONGO_DB_PORT;
	let db = "";
	it('Mounts the database uri', () => {
		expect(database.mountDbUri(host, port, db)).to.equal(dbUri);
	});
	it('Connects without errors', async () => {
        const mongoConn = await database
            .connect(
                database.mountDbUri(host, port, db) +
                '?directConnection=true&serverSelectionTimeoutMS=5000'
            ).asPromise();
		expect(mongoConn.readyState).to.equal(1);
	});
});
