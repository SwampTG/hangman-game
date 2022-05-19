const mongoose = require('mongoose');
const loadEnv = require('./env');

loadEnv.get();

module.exports = {
    connect: (dbUri) => {
        return mongoose.createConnection(dbUri);
    },
    mountDbUri: (host, port, dbName) => `mongodb://${host}:${port}/${dbName}`,
}