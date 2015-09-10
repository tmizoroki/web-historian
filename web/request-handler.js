var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var qs = require('querystring');

// Requiring fs modeule to serve up Index.html
var fs = require('fs');
var path = require('path');

exports.handleRequest = function (req, res) {
  // console.log(req);
  // Parse the incoming url
  var urlPath = url.parse(req.url).pathname;
  // Creates path to index.html
  var clientHtml = path.join(process.cwd(), 'web', 'public', 'index.html');
  var fixturePath = archive.paths.archivedSites + urlPath;

  // GET Route
  if(req.method === "GET") {
    // If GET request for "/"
    if(urlPath === "/" || urlPath === "/styles.css") { // Within GET route, serve Index.html
      fs.readFile(clientHtml, function read(err, html) {
        if (err) {
          throw err;
        } else {
          res.writeHead(200, {"Content-Type": "text/html"});
          res.write(html, 'binary');
          res.end();
        }
      });
    } else { // Within GET route, serve any other path

      // Check if in URLarchive
      archive.isUrlArchived(urlPath.slice(1), function(bool) {
        // If we have the URL in the archive
        if (bool) {

          fs.readFile(fixturePath, function read(err, html) {
            if (err) {
              throw err;
            } else {
              res.writeHead(200, {"Content-Type": "text/html"});
              res.write(html, 'binary');
              res.end();
            }
          });
        } else {
          res.writeHead(404, {"Content-Type": "text/html"});
          res.end();
        }

      });
    }
  } else if (req.method === 'POST') { // POST Route
    if(urlPath === "/") {

      var body = '';
      req.on('data', function (data) {
        body += data;
      });


      req.on('end', function() {
        console.log('inside req on end')
        var address = qs.parse(body).url;

        // Check if URL is in List
        archive.isUrlInList(address, function(isInList) {
          isInList ? archive.isUrlArchived() : archive.addUrlToList(address, function() {
            res.writeHead(302, {"Content-Type": "text/html"});
            res.end();
          });

        });
      });
    }

  } 

};
