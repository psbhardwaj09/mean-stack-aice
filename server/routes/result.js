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
        console.log(" uploadingResult( " + name + " ) -> form.on( " + file.originalFilename + " )");
        var targetPath = './uploads/' + file.originalFilename;
        let temporal_path = file.path;

        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            console.log('Wrong extension type');
            return;
        }

        fs.rename(temporal_path, targetPath, function(error) {
            if (error) {
                if (error.code === 'EXDEV') {
                    copy(temporal_path, targetPath, req, res);
                } else {
                    console.log("Uploaded successfully");
                }
            } else {
                console.log("Uploaded successfully");
                parseFile(req, res);
            }
        });
    });

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });

    form.on('close', function() {
        console.log('form.close : FIle uploaded successfully');
    });

    form.parse(req);
});


function parseFile(req, res) {
    let exceltojson;
    console.log("parseFile Uploaded excel file : " + req.file.originalname);
    if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
        exceltojson = xlsxtojson;
    } else {
        exceltojson = xlstojson;
    }

    try {
        exceltojson({
            input: req.file.path,
            output: null, //since we don't need output.json
            lowerCaseHeaders: true
        }, function(err, result) {
            if (err) {
                console.log('parseFile() - Error : ' + err);
                return;
                // return res.json({ error_code: 1, err_desc: err, data: null });
            }
            console.log('parseFile() - result : ' + result);
            //res.json({ error_code: 0, err_desc: null, data: result });
        });
    } catch (err) {
        console.log('parseFile() - Corupted excel file : ' + err);
    }
}

module.exports = router;