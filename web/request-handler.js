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

  

  // GET Route
  if(req.method === "GET") {
    // If GET request for "/"
    if(urlPath === "/" || urlPath === "/styles.css") {
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
    
  // POST Route
  } else if (req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });


    req.on('end', function() {
      var address = qs.parse(body).url;

      var isInList = archive.isUrlInList(address, function(flag) {
        return flag;
      });

      isInList ? archive.isUrlArchived() : archive.addUrlToList(address);

    });
  } else if ("something") {
    res.end(archive.paths.list);
  }

};
