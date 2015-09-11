// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');
var http = require('http-request')

// readListofURLs
exports.fetch = function(fetchCallback) {
  archive.readListOfUrls(function(data) {
    console.log("data inside readlistofurls: " + data);
    // downloadUrls
    archive.downloadUrls(data, function() {
      console.log("inside downloadUrls");
       if(fetchCallback) fetchCallback();
    });
  });
  
}
exports.fetch();


