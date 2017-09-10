const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var multiparty = require('multiparty');
var util = require('util');

var fs = require('fs');
var fstream = require('fstream');
var mkdirp = require('mkdirp');
var path = require('path');
var request = require("request");

var size = '';
var fileName = '';

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/aice', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
};

// Get users
router.post('/registration', (req, res) => {
  console.log('/registration');

  var form = new multiparty.Form();
  var temporal_path, originalFileName, size;

  form.on('field', function (field, value) {
    console.log(" addLogFile() -> field : "+ field+", \t value : "+ value);
  });

  /* Parse the form submitted from UI */
  form.on('file', function (name, file) {
    console.log(" uploading() -> form.on("+file.originalFilename+")");
    /* Get temporary path  and temporary filename*/
    temporal_path = file.path;
    originalFileName = file.originalFilename;
    size = Number(file.size)/1000;

    var folderPath = '/../../src/assets/UploadedFiles';
    var uploadFilePath = __dirname + folderPath;
    if(!fs.existsSync(uploadFilePath)) {
        fs.mkdir(uploadFilePath, 0777, function (err) {
          if (err) console.error(err);
          else{
              console.log(' check_dir() -> created : ' + uploadFilePath);
        }
      });
    }

    var targetPath = uploadFilePath +"/" + originalFileName;
    console.log('targetPath : '+ targetPath);

    fs.rename(temporal_path, targetPath, function(error) {
      if(error){
        if (error.code === 'EXDEV') {
            copy(temporal_path, targetPath, req, res);
        }  else {
          console.log("Uploaded successfully");
          response.data ={
            "FileURL" :"/"
          }
          res.end("Uploaded successfully");
        }
      }else{
        res.end("Uploaded successfully");
        console.log("Uploaded successfully");
      }

    });
  });

  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });

  form.parse(req);
});

function copy(oldPath, newPath, req, res) {
  console.log('oldPath : '+ oldPath);
  console.log('newPath : '+ newPath);
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    readStream.on('error', function(){
    	res.end("Failed to upload");
    });

    writeStream.on('error', function(){
    	res.end("Failed to upload");
    });

    readStream.on('close', function () {
        fs.unlink(oldPath);
        writeStream.end();
        res.end("Uploaded successfully");
    });

    readStream.pipe(writeStream);
}

module.exports = router;
