const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const port = process.argv[2] || 9090;
const mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  wasm: 'application/wasm',
  css: 'text/css',
};

http.createServer({}, (request, response) => {
  const uri = url.parse(request.url).pathname;
  let filename = path.join(process.cwd(), uri);

  fs.exists(filename, (exists) => {
    if (!exists) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      if (filename[filename.length - 1] !== '/') {
        filename += '/';
      }
    }
    // filename += 'index.html';

    fs.readFile(filename, 'binary', (err, file) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain', 'Cross-Origin-Opener-Policy': 'same-origin unsafe-allow-outgoing' });
        response.write(`${err}\n`);
        response.end();
        return;
      }

      let mimeType = mimeTypes[filename.split('.').pop()];

      if (!mimeType) {
        mimeType = 'text/plain';
      }

      console.log(`serving ${filename}`);

      response.writeHead(200, {
        'Content-Type': mimeType,
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
      });
      response.write(file, 'binary');
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log(`Static file server running at\n  => http://localhost:${port}/\nCTRL + C to shutdown`);
