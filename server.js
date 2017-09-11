const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
var mongoose = require('mongoose');
var autoIncrement = require('./models/autoIncrement');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/acme_skills_db', { useMongoClient: true });

var db = mongoose.connection;


db.on('connected', ()=>{
    console.log('Connected to MongoDB @ 27017');
});

mongoose.connection.on('error', (error)=>{
    if(error){
        console.log('Error while Connecting to database : '+ error);
    }
});

db.once('open', function() {
  console.log('Connecte to database');

});

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
