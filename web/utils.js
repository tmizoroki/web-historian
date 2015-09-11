exports.sendResponse = function(filePath) {
  fs.readFile(filePath, function read(err, html) {
    if (err) {
      throw err;
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(html, 'binary');
      res.end();
    }
  });
};

// Specifically callbacks on the sent address
exports.collectData = function(req, callback) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });

  req.on('end', function() {
    var address = qs.parse(body).url;
    if(callback) {
      callback(address);
    }
  });
};

exports.makeActionHandler = function(actionMap) {
  return function(req, res) {
    var action = actionMap[req.method];
    if (action) { 
      action(req, res);
    } else {
      res.writeHead(404, {"Content-Type": "text/html"});
    }
  }
};