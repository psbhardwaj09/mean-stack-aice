const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    firstName :{
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    photo : {
      type : String,
      required : true
    },
    address : {
      type : String
    }
});

var Student = module.exports = mongoose.model('Student', StudentSchema);
