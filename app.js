const githubhook = require('githubhook');
const winston    = require('winston');
const shell      = require('shelljs');

// Setup winston to log to logger.log
const logger = new (winston.Logger)({
    transports: [ new (winston.transports.File)({ filename: __dirname + '/logger.log' }) ]
});

// Initialize githubhook
const github = githubhook({
    path: '/',
    port: '8010',
    logger: logger
});

// Start listening for POST events
github.listen();
logger.info('Listening...');

// Watch for 'push' event
github.on('push', function(event) {
    logger.info('Hit by push event');
    deploy();
});

// Watch for 'release' event
github.on('release', function(event) {
    logger.info('Hit by release event');
    deploy();
});

// Deploy
function deploy() {
    shell.cd('/home/dom/RevolutionUC-Website/');
    shell.exec('git pull');
    shell.exec('npm install');
    shell.exec('npm prune --production');
    shell.exec('bower install --allow-root --force');
    shell.exec('bower prune --allow-root --force');
    shell.exec('grunt build');

    logger.info('Deployed!');
};
