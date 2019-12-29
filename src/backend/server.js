const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;
const hostname = 'localhost';

const routes = [
	[/html$/i, path.join(__dirname, '../frontend/index.html'), 'text/html'],
	[/style\.css$/i, path.join(__dirname, '../frontend/style.css'), 'text/css'],
	[/js$/i, undefined, 'text/javascript'],
	[/js\.map$/i, undefined, 'text/plain']
];

http.createServer((request, response) => {
	if(!request.url.includes('favicon.ico')) {
		console.log('request.url', request.url);
		if(request.url === '/') {
			request.url = '/index.html';
		}

		const route = routes.find(elem => elem[0].test(request.url));

		if(route[1] === undefined) {
			let not_found_file = path.join(__dirname, '../frontend', request.url);
			fs.readFile(not_found_file, (err, content) => {
				if(err) {
					console.error(err);
					response.end('');
				}

				response.writeHead(200, {'Content-Type': route[2]});
				response.write(content);
				response.end('');
			});
			return;
		}

		const [, filepath, content_type] = route;
		console.log(`filepath is ${filepath}, content_type is ${content_type}`);

		fs.readFile(filepath, (err, content) => {
			if(err) {
				console.error(err);
				response.end('error reading file');
				return;
			}

			response.writeHead(200, {'Content-Type': content_type});
			response.write(content);
			response.end();
		});
	}
}).listen(port, hostname, () => {
	console.log(`Server running at ${hostname}:${port}`);
});
