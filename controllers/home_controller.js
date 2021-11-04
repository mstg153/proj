const Experience = require('../models/experiences');

module.exports.index= function (req,res) {
    return res.render('index', {
        layout:false
        // title:"WELCOME HOME
    });
}

module.exports.home = function(req, res){
    // console.log(req.cookies);
    Experience.find({}).populate('user').exec(function(err,exp){
        return res.render('home', {
            title: "Home",
            Experience: exp,
        });
    });
}

// module.exports.actionName = function(req, res){}