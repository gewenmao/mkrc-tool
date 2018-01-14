var inquirer = require('inquirer');
var shell = require('shelljs');
var template = require('./config-template');

function getAuth() {
	if (!shell.which('git')) {
		return;
	}
}

function processAnswers(answers) {
	let config = {};

	config.pkgName = answers.pkgName;

	return config;
}

function promot(callback) {
	let config;

	inquirer.prompt([
		{
			type: 'input',
			name: 'pkgName',
			message: 'component name',
		},
	]).then(function (answers) {
		if (!answers.pkgName)	{
			return;
		}
		config = processAnswers(answers);
		template.init(config);
	})
}

module.exports = promot;
