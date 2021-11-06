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

module.exports.article = function(req,res){
    let id = req.query.id.trim();
    // console.log(id);
    

    Experience.find({_id:id},function(err,exp){
        if(err){console.log("error in finding article");}
        if(!exp){
            console.log("no article found");
            return;
        }
        // console.log(exp);
        return res.render('article', {
            title: "ARTICLE",
            exp: exp[0],
        });
    });
}

// module.exports.actionName = function(req, res){}