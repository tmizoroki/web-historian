var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
  // iterate over the array of URLS

    // call callback on each URL

};

exports.isUrlInList = function(address, callback) {

  var isInList = function(err, data) {
    if (err) {
      throw err;
    }
    if (data.length > 0) {
      // parse data
      var parsedData = JSON.parse(data);
      // data.indexOf (address)
      callback(parsedData.indexOf(address) > -1);
    }
  }

  fs.readFile(exports.paths.list, 'utf-8', isInList);
};

exports.addUrlToList = function(address) {
  //read the file
  fs.readFile(exports.paths.list, 'utf-8',function(err, data) {
    if (err) {
      throw err;
    }
    // If the .txt file is empty, the create a JSON array
    if (data.length === 0) {
      data = JSON.stringify([]);
    }

    var parseData = JSON.parse(data);
    parseData.push(address);

    var stringifiedData = JSON.stringify(parseData);

    fs.writeFile(exports.paths.list, stringifiedData, function(err) {
      if (err) {
        throw err;
      }
    })
  });
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
