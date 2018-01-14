#!/usr/bin/env node
const configInit = require('../lib/config/config-init.js');
configInit(err => {
if (err) {
		process.exitCode = 1;
		console.error(err.message);
		console.error(err.stack);
	} else {
		process.exitCode = 0;
	}	
});

