# site-deployment

A github webhook deployment service for [Bearcat-Hackers/RevolutionUC-Website](https://github.com/Bearcat-Hackers/RevolutionUC-Website).

## Quick Start

`git clone https://github.com/Bearcat-Hackers/site-deployment.git`

`cd site-deployment`

`npm install`

Use `.env.example` as an example `.env`. This is used to store [your GitHub secret token for webhooks](https://developer.github.com/webhooks/securing/) and the path to the site to deploy. Include `NODE_ENV=production` for production.

`node app.js` or `forever start app.js` to keep the service going in the background (port 8010)
