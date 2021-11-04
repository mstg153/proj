const Experience = require('../models/experiences');

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