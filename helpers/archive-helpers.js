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
};

exports.isUrlInList = function(address) {
  // read
  var isInList = false;
  fs.readFile(exports.paths.list, function(err, data) {
    //console.log(err);
    if (err) {
      throw err;
    }

    if (data.length > 0) {
      // parse data
      var parsedData = JSON.parse(data);
      // data.indexOf (address)
      isInList = parsedData.indexOf(address) > -1;
      console.log("In list?? " + isInList);
    } else {
      throw err;
    } 
  });
  console.log('isinlist outside: ', isInList);
  return isInList;
};

exports.addUrlToList = function() {
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
