var database = require('./../config/database');

const registerModels = (modelName, schema) => {
	return database.getDefaultConnection().model(modelName, schema);
}

module.exports = {
	registerModels: registerModels,
};
