const mongoose = require('mongoose');
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength:32
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique:32
    },
    hashed_password: {
        type: String,
        require:false,
    },
    about: {
        type: String,
        trim:true,
    },
    salt: {
        type:String
    },
    role: {
        type: Number,
        default:0
    },
    history: {
        type: Array,
        default:[]
    },
    password: {
        type:String
    }
}, { timestamps: true })
module.exports = mongoose.model("User", userSchema);