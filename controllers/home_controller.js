const Experience = require('../models/experiences');

module.exports.index= function (req,res) {
    return res.render('index', {
        layout:false
        // title:"WELCOME HOME
    });
}

module.exports.home = function(req, res){
    // console.log(req.cookies);

    let year = req.body.years;
    let company = req.body.company;
    
    // console.log("comp_list");
 
    if ((year == "" || year == undefined) && (company == "" || company== undefined)){
        

        Experience.find({}).populate('user').exec(function(err,exp){
            return res.render('home', {
                title: "Home",
                Experience: exp,
            });
        });
    }

    else if(company == "" || company== undefined){
        Experience.find({yearofGraduation:year}, function(err,exp){
            if(err){console.log("error in finding article");}
            if(!exp){
                console.log("no article found");
                return;
            }
            // console.log(exps);
            return res.render('home', {
                title: "Home",
                Experience: exp,
               
            });
        });
    }

    else if(year == "" || year == undefined){
        Experience.find({Company_Name:company}, function(err,exp){
            if(err){console.log("error in finding article");}
            if(!exp){
                console.log("no article found");
                return;
            }
            // console.log(exps);
            return res.render('home', {
                title: "Home",
                Experience: exp,
               
            });
        });
    }
    else{
        Experience.find({yearofGraduation:year,Company_Name:company}, function(err,exp){
            if(err){console.log("error in finding article");}
            if(!exp){
                console.log("no article found");
                return;
            }
            // console.log(exps);
            return res.render('home', {
                title: "Home",
                Experience: exp,
               
            });
        });

    }
    

    // Experience.find({}).populate('user').exec(function(err,exp){
    //     return res.render('home', {
    //         title: "Home",
    //         Experience: exp,
    //     });
    // });
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

module.exports.creators= function (req,res) {
    return res.render('creators', {
        // layout:false

        title:"Creators"
    });
}

// module.exports.filter = function(req,res){
//     let year = req.body.years;
//     // console.log(year);
//     if (year == "" || year == undefined){
//         return res.redirect('back');
//     }
//     Experience.find({yearofGraduation:year}, function(err,exps){
//         if(err){console.log("error in finding article");}
//         if(!exps){
//             console.log("no article found");
//             return;
//         }
//         // console.log(exps);
//         return res.render('home', {
//             title: "Home",
//             Experience: exps,
//         });
//     });
// }

// module.exports.actionName = function(req, res){}