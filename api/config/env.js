const fileExists = require('file-exists');
const path = require('path');
const rootPath = require('app-root-path');
const env = require('node-env-file');

module.exports = {
	get: () => {
		const envFileLocation = path.join(rootPath, './env');
		if (fileExists.sync(envFileLocation)) {
			env(envFileLocation);
		}
	},
};