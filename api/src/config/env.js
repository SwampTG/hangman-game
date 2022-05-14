const fileExists = require('file-exists');
const rootPath = require('app-root-path');
const env = require('node-env-file');

module.exports = {
	get: () => {
		const envFileLocation = rootPath.toString().concat('/env');
		if (fileExists.sync(envFileLocation)) {
			env(envFileLocation);
		}
	},
};