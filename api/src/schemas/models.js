const { default: mongoose } = require('mongoose');

// const Game = (collection) =>
// 	collection.model('Game', gameSchema, db.getHangmanCollectionName());
// const User = (collection) =>
//     collection.model('hangman-user', userSchema);

const registerModels = (modelName, schema) => {
	return mongoose.model(modelName, schema);
}

module.exports = {
	registerModels: registerModels,
};
