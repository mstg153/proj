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
    cgpa: {
        type:String,
        required:true
    },

    Student_Roll: {
        type: Number,
        require: true
    },

    department:{
        type: String,
        required: true
    },

    yearofGraduation:{
        type: Number,
        require:true
    },

    Company_Name: {
        type: String,
        required: true
    },

    applied_role:{
        type: String,
        required:true
    },
    ctc:{
        type: String,
        required:true
    },
    
    offer_status:{
        type:String,
        required:true
    },

    Applied_Platform:{
        type: String,
        require: true
    },
    
    topics_prep:{
        type:String,
        required:true
    },

    prep_time:{
        type:String,
        required:true
    },

    resource:{
        type:String,
        required:true
    },

    prep_tips:{
        type:String,
        required:true
    },

    elig_cri:{
        type:String,
        required:true
    },

    resume_tips:{
        type:String,
        required:true
    },

    reason:{
        type:String,
        required:true
    },


    


    No_of_Rounds:{
        type: Number
    },

    int_1:{
        type:String,
        required:true
    },

    experience:{
        type:String,
        require: true
    },

    suggestions:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:0
    },
    message:{
        type:String,
        default:""
    }
},{
    timestamps: true
});

console.log("in exp DB");

const Experience = mongoose.model('Experience', expSchema);
module.exports = Experience;