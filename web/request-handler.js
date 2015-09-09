var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
// Requiring fs modeule to serve up Index.html
var fs = require('fs');
var path = require('path');

exports.handleRequest = function (req, res) {
  console.log(req.method);
  // Parse the incoming url
  var urlPath = url.parse(req.url).pathname;
  // Creates path to index.html
  var clientHtml = path.join(process.cwd(), 'web', 'public', 'index.html');
  console.log(clientHtml);

  if( urlPath === "/" || urlPath === "/styles.css") {
    fs.readFile(clientHtml, function read(err, html) {
      if (err) {
        throw err;
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html, 'binary');
        res.end();
      }
    });
  }
  // Setup route for GET request
  if( req.method === "GET") {
    // If GET request for "/"
  } else if("something") {
    res.end(archive.paths.list);
  }

};
