const fileExists = require('file-exists');
const rootPath = require('app-root-path');
const env = require('node-env-file');

module.exports = {
	get: () => {
		const envFileLocation = rootPath.toString().concat('/src/.env');
		if (fileExists.sync(envFileLocation)) {
			env(envFileLocation);
		} else {
			console.log('Error: envFile not found');
			console.log(envFileLocation);
			process.exit(-1);
		}
	},
};