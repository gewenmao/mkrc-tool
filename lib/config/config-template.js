const path = require('path');
const shell = require('shelljs');
const _ = require('lodash');
const colors = require('./config-colors');

const templateDir = path.join(__dirname, '../../template') 
const currentDir = process.cwd();

function createRootDir(rootName) {
	if (shell.test('-e', rootName)) {
		console.log(`${rootName} has existed`.error);
		return false;
	}
	console.log(`mkdir ${rootName}`.info)
	shell.mkdir(rootName);
	return true;
}

function copyFile(config, curDir) {
	const pkgName = config.pkgName;
	shell
		.ls(curDir)
		.forEach(function(subDir) {
			const srcDir = path.join(curDir, subDir);
			const relDir = path.relative(templateDir, curDir)
			if (shell.test('-d', srcDir)) {
				const targetDir = path.join(currentDir, pkgName, relDir, subDir);
				console.log(`mkdir ${path.join(pkgName, relDir, subDir)}`.info)
				shell.mkdir(targetDir)
				copyFile(config, srcDir);
			}
			if (shell.test('-f', srcDir)) {
				if (subDir.indexOf('_') != 0) {
					return;
				}
				subDir = subDir.slice(1);
				const targetDir = path.join(currentDir, pkgName, relDir, subDir);
				const content = shell.cat(srcDir);
				const compiled = _.template(content);
				console.log(`mkdir ${path.join(pkgName, relDir, subDir)}`.info)

				compiled(config).to(targetDir);
			}
		})
}

function initTemplate(config) {
	createRootDir(config.pkgName);
	copyFile(config, templateDir);
}

module.exports = {
	init: initTemplate
}
