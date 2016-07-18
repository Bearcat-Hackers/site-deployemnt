var webhooks = require('github-webhooks');
var shell = require('shelljs');

var PORT = 8010

webhooks.on('push', function(payload) {
		console.log('about to deploy!');

		shell.cd('/home/dom/RevolutionUC-Website/');
		shell.exec('git pull');
		shell.exec('grunt build');

		console.log('done building!');
});

console.log("Running on port: " + PORT);
