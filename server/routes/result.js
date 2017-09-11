const express = require('express');
const router = express.Router();
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const multiparty = require('multiparty');
const fs = require('fs');


router.post('/uploadResult', (req, res) => {
    console.log('Upload Result :-');

    let form = new multiparty.Form();

    form.on('file', function(name, file) {
      let fileName = file.originalFilename ;
        console.log(" uploadingResult( " + name + " ) -> form.on( " + fileName + " )");

        var targetPath = './uploads/' + file.originalFilename;
        let temporal_path = file.path;
        console.log('Split : ', fileName.split('.'));

        if (['xls', 'xlsx'].indexOf(fileName.split('.')[fileName.split('.').length - 1]) === -1) {
            console.log('Wrong extension type');
            return;
        }

        // fs.rename(temporal_path, targetPath, function(error) {
        //     if (error) {
        //         if (error.code === 'EXDEV') {
        //             copy(temporal_path, targetPath, req, res);
        //         } else {
        //             console.log("Uploaded successfully");
        //             parseFile(req, res);
        //         }
        //     } else {
        //         console.log("Uploaded successfully");
        //         parseFile(req, res);
        //     }
        // });
        parseFile(file);
    });

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });

    form.on('close', function() {
        console.log('form.close : FIle uploaded successfully');
    });

    form.parse(req);
});


function parseFile(file) {
    let exceltojson;
    let fileName = file.originalFilename ;
    console.log("parseFile Uploaded excel file : " + fileName);
    if (fileName.split('.')[fileName.split('.').length - 1] === 'xlsx') {
        exceltojson = xlsxtojson;
    } else {
        exceltojson = xlstojson;
    }

    try {
        exceltojson({
            input: file.path,
            output: null, //since we don't need output.json
            lowerCaseHeaders: true
        }, function(err, result) {
            if (err) {
                console.log('parseFile() - Error : ' + err);
                return;
            }
            console.log('parseFile() - result : ' + result);
            console.dir(result);
        });
    } catch (err) {
        console.log('parseFile() - Corupted excel file : ' + err);
    }
}

module.exports = router;
