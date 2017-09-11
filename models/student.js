const mongoose = require('mongoose');
mongoose.Promise = Promise;
var autoIncrement = require('./autoIncrement');
var moment = require('moment');
var prefixRegNumber = 'ECME' + moment().format('/MMYYYYDD/');

const StudentSchema = mongoose.Schema({
    rollNumber: {
        type: Number,
        require: true,
        default: 10000
    },
    regNumber: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: false
    },
    supportingDoc: {
        type: String,
        required: false
    },
    address: {
        type: String
    },
    regDate: {
        type: String,
        required: true,
        default: moment().format('DD/MM/YYYY')
    },
});

autoIncrement.initialize(mongoose.connection);
//Auto-increment
StudentSchema.plugin(autoIncrement.plugin, { model: 'Student', field: 'regNumber', secondaryFiled: 'rollNumber', startAt: 10000, prefix: prefixRegNumber });

var Student = module.exports = mongoose.model('Student', StudentSchema);