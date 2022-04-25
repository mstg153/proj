const mongoose = require('mongoose');

const selSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    company:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});


const Sel = mongoose.model('Sel', selSchema);

module.exports = Sel;