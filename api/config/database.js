const mongoose = require('mongoose');
const loadEnv = require('./env');

loadEnv.get();

module.exports = {
    connect: (dbUri) => {
        return mongoose.createConnection(dbUri, {
            useMongoClient: true,
            user: process.env.MONGO_DB_USERNAME,
            pass: process.env.MONGO_DB_PASSWORD
        })
    },
}