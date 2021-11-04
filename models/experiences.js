const mongoose = require('mongoose');

const expSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    Student_Name : {
        type:String,
        required:true
    },
    Student_Roll: {
        type: Number,
        require: true
    },
    Company_Name: {
        type: String,
        required: true
    },
    Applied_Platform:{
        type: String,
        require: true
    },
    No_of_Rounds:{
        type: Number
    },
    experience:{
        type:String,
        require: true
    },
    status:{
        type:Number,
        default:0
    }
},{
    timestamps: true
});

console.log("in exp DB");

const Experience = mongoose.model('Experience', expSchema);
module.exports = Experience;