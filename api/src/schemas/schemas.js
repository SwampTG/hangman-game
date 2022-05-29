const { default: mongoose } = require('mongoose');

var userSchema = new mongoose.Schema({
		login: String,
		name: String,
	})

module.exports = {
	gameSchema: new mongoose.Schema({
		word: String,
		chosenLetters: [String],
		owner: Object,
		players: [userSchema],
		turnsPassed: Number,
		max: Number,
		createdAt: Date,
		startedAt: Date,
	}),
	userSchema
};
