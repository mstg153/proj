const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department:{
        type: String,
        required:true
    },
    yearofGraduation:{
        type:Number,
        required:true
    },
    enroll:{
        type:Number,
        required:true
    },
    role:{
        type:Number,
        default:-1
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;