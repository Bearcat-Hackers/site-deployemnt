var gith = require('gith').create(8010);
var shell = require('shelljs');


gith({
	repo: 'Bearcat-Hackers/RevolutionUC-Website'
}).on('all', function(paylod) {
	if(paylod.branch === 'master') {
		console.log('about to deploy!');
		deploy();
	}
})

function deploy() {
	shell.cd('/home/curtis/RevolutionUC-F2014/RevolutionUC-Website/');
	shell.exec('git pull https://github.com/Bearcat-Hackers/RevolutionUC-Website.git');
	shell.exec('grunt build');

	console.log('done building!')
}
