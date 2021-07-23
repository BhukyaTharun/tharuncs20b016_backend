const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
    "name": {
        type : String,
        minlength : 2,
        required : true
    },
    "email": {
        type : String,
        minlength : 2,
        required : true
    }
})

module.exports = userSchema
