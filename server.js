/*
 * freeCodeCamp APIs and Microservices Certification
 * Project 5: File Metadata Microservice
 * Alex Kozlov, 2020
 */

/*
 * The main node.js app script for the File Metadata Microservice.
 */

'use strict';

/*
 * Initial configuration.
 */

var express = require('express');
var cors = require('cors');
var fs = require('fs');
var os = require('os');
var multer  = require('multer');
var app = express();
var upload = multer({ dest: os.tmpdir() });

/*
 * Mount middleware.
 */

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

/*
 * Serve 'index.html' at the root path.
 */

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/*
 * Endpoint to analyze a file.
 */

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  if (!req.file) return next({
    status: 400, stack: 'No file uploaded'
  });

  console.log("Received a request to analyze file '%s'", req.file.originalname);
  console.log("Saving uploaded file to: '%s'", req.file.path);

  // send the result
  const result = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  console.log("Analyzed the following file:\n'%o'", result);
  res.json(result);

  // remove uploaded file
  fs.unlink(req.file.path, err => {
    if (err) return console.error(err);
    console.log("Successfully deleted uploaded file: '%s'", req.file.path);
  });
});

/*
 * Listen for requests.
 */

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port: ' + listener.address().port + '\n');
});
