const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
// const validator = require("validator")

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,"Please fill a valid email address", ]
    },
    mobile: {
        type: Number,
        unique:true,
        required: true
    },
    collegeId: {
        type: ObjectId,
        ref: "Project_College"},
    isDeleted: {
        type: Boolean,
        default: false
    }

},{timestamps :true});

module.exports = mongoose.model('Project_Intern', internSchema) 