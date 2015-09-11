var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var qs = require('querystring');
var fetch = require('../workers/htmlfetcher.js');

// Requiring fs modeule to serve up Index.html
var fs = require('fs');

exports.handleRequest = function (req, res) {
  // console.log(req);
  // Parse the incoming url
  var urlPath = url.parse(req.url).pathname;
  // Creates path to index.html
  var clientHtml = path.join(process.cwd(), 'public', 'index.html');
  var loadingHtml = path.join(process.cwd(), 'public', 'loading.html');
  var fixturePath = archive.paths.archivedSites + urlPath;

  // GET Route
  if(req.method === "GET") {
    // If GET request for "/"
    if(urlPath === "/" || urlPath === "/styles.css") { // Within GET route, serve Index.html
    console.log('inside GET:');
      console.log(clientHtml);
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
          if (isInList) { // If we have the address in the list .txt
            // If we have the page archived
            archive.isUrlArchived(address, function(isInArchive) {
              if(isInArchive) {
                // Make sure the path is there
                var sitePath = archive.paths.archivedSites + "/" + address;
                // Serve Archived Page
                fs.readFile(sitePath, function read(err, html) {
                  if (err) {
                    throw err;
                  } else {
                    res.writeHead(302, {"Location": "http://" + "127.0.0.1:8080/" + address});
                    res.write(html, 'binary');
                    res.end();
                  }
                });
              } else { // NOTE: HANDLE IF NOT ARCHIVED
                console.log("right before fetch")
                fetch.fetch(function(){
                  var sitePath = archive.paths.archivedSites + "/" + address;
                  // Serve Archived Page
                  fs.readFile(sitePath, function read(err, html) {
                    console.log("inside read file")
                    if (err) {
                      throw err;
                    } else {
                      res.writeHead(302, {"Content-Type": "text/html"});
                      res.write(html, 'binary');
                      res.end();
                    }
                  });
                });
              }
            });

            

          } else { // If the URL is not in the list, add it to list, serve user loading page
            //Successfully posting url to list
            archive.addUrlToList(address, function() {
              // Serve Loading Page
              fetch.fetch();
              fs.readFile(loadingHtml, function read(err, html) {
                if (err) {
                  throw err;
                } else {
                  res.writeHead(302, {"Content-Type": "text/html"});
                  res.write(html, 'binary');
                  res.end();
                }
              });
            });
          }
        });
      });
    }
  } 
};
