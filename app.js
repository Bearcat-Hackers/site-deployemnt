'use strict';

require('dotenv').config();

const githubhook = require('githubhook');
const winston    = require('winston');
const shell      = require('shelljs');

// Setup winston to log to logger.log
const logger = new (winston.Logger)({
    transports: [ new (winston.transports.File)({ filename: __dirname + '/logger.log' }) ]
});

// Initialize githubhook
const github = githubhook({
    path: '/payload',
    port: 8010,
    logger: logger,
    secret: process.env.SECRET
});

// Start listening for POST events
github.listen();
logger.info('Listening...');

// Watch for 'push' event
github.on('push', function(repo, ref, data) {
    const deliveryId = data.request.headers['x-github-delivery'];
    logger.info('Hit by push event (delivery id: %s)', deliveryId);
    deploy(deliveryId);
});

// Watch for 'release' event
github.on('release', function(repo, ref, data) {
    const deliveryId = data.request.headers['x-github-delivery'];
    logger.info('Hit by release event (delivery id: %s)', deliveryId);
    deploy(deliveryId);
});

// Deploy
function deploy(deliveryId) {
    logger.info('Deployment started... (delivery id: %s)', deliveryId);

    shell.cd(process.env.SITE_PATH);
    shell.exec('git fetch --all');
    shell.exec('git reset --hard origin/master');
    shell.exec('npm install');
    shell.exec('npm prune --production');
    shell.exec('bower install --allow-root --force');
    shell.exec('bower prune --allow-root --force');
    shell.exec('grunt build');

    logger.info('Deployed! (delivery id: %s)', deliveryId);
};
