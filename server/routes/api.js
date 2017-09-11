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
const Student = require('../../models/student');
const Counter = require('../../models/autoIncrement');

var size = '';
var fileName = '';

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


router.post('/registration', (req, res) => {
    console.log('/registration');

    var form = new multiparty.Form();
    var temporal_path, originalFileName, size;
    var studentData ={};

    var folderPath = '/../../src/assets/UploadedFiles';
    var uploadFilePath = __dirname + folderPath;


    form.on('field', function (field, value) {
    // console.log(" addLogFile() -> field : "+ field+", \t value : "+ value);
      studentData[field] = value;
    });

    /* Parse the form submitted from UI */
    form.on('file', function (name, file) {
      console.log(" uploading("+name+") -> form.on("+file.originalFilename+")");
      studentData[name] = file.originalFilename;
      /* Get temporary path  and temporary filename*/
      temporal_path = file.path;
      originalFileName = file.originalFilename;
      size = Number(file.size)/1000;

      var targetPath = uploadFilePath +"/" + originalFileName;

      if(!fs.existsSync(uploadFilePath)) {
          fs.mkdir(uploadFilePath, 0777, function (err) {
            if (err) console.error(err);
            else{
                console.log(' check_dir() -> created : ' + uploadFilePath);
          }
        });
      }

      console.log('targetPath : '+ targetPath);

      fs.rename(temporal_path, targetPath, function(error) {
        if(error){
          if (error.code === 'EXDEV') {
              copy(temporal_path, targetPath, req, res);
          }  else {
          //  console.log("Uploaded successfully");
            res.end("Uploaded successfully");
          }
        }else{
          res.end("Uploaded successfully");
        // console.log("Uploaded successfully");
        }

      });
    });

    form.on('error', function(err) {
      console.log('Error parsing form: ' + err.stack);
    });

    form.on('close', function(){
      let newStudent = new Student(studentData);
      newStudent.save((error, student)=>{
        if(error){
            console.log('Unable to register - error', error);
          // res.json({msg: 'Unable to register'});
        }
        else{
            console.log('Student Registered Successfully- student :', student);
          // res.json({msg: 'Student Registered Successfully'});
        }
      });
    })

    form.parse(req);
  });


  router.get('/getStudents', (req, res) => {
    console.log("----- getStudents ----  ");
    Student.find((error, students)=>{
     // response.data = students;
     if(error){
       console.log('Error while fetching data :'+ error);
     }
      console.log('Fetched Data : ', students);
      response.data = students;
      res.end(JSON.stringify(response));
    });
  })

  router.get('/getStudent/:id', (req, res) => {
    console.log("----- getStudent ----  ");
    Student.findOne({_id: id}, (error, students)=>{
     // response.data = students;
     if(error){
       console.log('Error while fetching data :'+ error);
     }
      console.log('Fetched Data : ', students);
      response.data = students;
      res.end(JSON.stringify(response));
    });
  })

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
