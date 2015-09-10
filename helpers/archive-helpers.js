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

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if(err) {
      throw err;
    }
    data = data.split('\n');
    callback(data);
  });

};

exports.isUrlInList = function(address, callback) {

  var isInList = function(err, data) {
    if (err) {
      throw err;
    }
    if (data.length > 0) {
      var parsedData = data.split('\n');
      callback(parsedData.indexOf(address) > -1);
    }
  }

  fs.readFile(exports.paths.list, 'utf-8', isInList);
};

exports.addUrlToList = function(address, callback) {
  // invoke isUrlOnList(adress, function(boolean) {
    // if(boolean )

  })
  address = address + "\n";

  fs.appendFile(exports.paths.list, address, function (err) {
    if(err) {
      throw err;
    }
    console.log('The "data to append" was appended to file!');

  });
    

};

// archive.addUrlToList('someurl.com');
// archive.isUrlInList('someurl'); // --> false?

exports.isUrlArchived = function(address, callback) {
  var flag = false;
  var isArchived = function(err) {
    if (!err) {
      flag = true;
    }
    console.log(flag, address);
    callback(flag);
  }
  fs.access(exports.paths.archivedSites + "/" + address, fs.R_OK, isArchived);
};

exports.downloadUrls = function() {
};
