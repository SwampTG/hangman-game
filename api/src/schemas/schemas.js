const { default: mongoose } = require('mongoose');

var userSchema = new mongoose.Schema({
		login: String,
		name: String,
	})

module.exports = {
	gameSchema: new mongoose.Schema({
		word: {
			type: String,
			required: true,
			maxlength: 50,
		},
		chosenLetters: {
			type: [String],
			default: '',
		},
		owner: userSchema,
		players: [userSchema],
		turnsPassed: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 5,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		startedAt: Date,
	}),
	userSchema,
};
