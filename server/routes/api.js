const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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
    message: 'Data Fetched'
};

// Get students
router.get('/students', (req, res) => {
    console.log('/students/Request : ', req.body);
    connection((db) => {
        db.collection('students')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/register', (req, res)=>{

    console.log("/Register/",req.body.firstName);
     response.message ="Registred successfully"
   res.json(response);

});

module.exports = router;
