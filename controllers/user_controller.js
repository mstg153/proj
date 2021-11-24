const User = require('../models/user');
const Experience = require('../models/experiences');

module.exports.profile = function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('users/sign-in');
    }
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

module.exports.form = function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }
    return res.render('form', {
        title: 'Experience Form'
    })
}

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: " Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('user_sign_in', {
        title: "Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.createform = function(req,res){
    Experience.create(req.body,function(err,exp){
        if(err){console.log('error in creating a exp'); return}
        return res.redirect('/users/profile');
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}

module.exports.verifyexp = function(req,res){

    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
        // if(user.role==0){
        //     return res.redirect('back');
        // }
        // else{
        //     return res.render('unverified',{
        //         title:"VErify EXP",
        //     });
        Experience.find({}).populate('user').exec(function(err,exp){
            return res.render('unverified', {
                title: "UNIVERIFIED",
                Experience: exp,
            });
        });
}
module.exports.deleted = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
    let id = req.query.id;
    Experience.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting");
        }
        return res.redirect('back');
    })
}
module.exports.verified = function(req,res){
    // console.log("in deleting");
    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
    let id = req.query.id;
    console.log(id);
    Experience.findOneAndUpdate({_id:id},{status:1},function(err){
        if(err){
            console.log("error in deleting");
            return;
        }
        return res.redirect('back');
    });
}

module.exports.verifyuser = function(req,res){

    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
        // if(user.role==0){
        //     return res.redirect('back');
        // }
        // else{
        //     return res.render('unverified',{
        //         title:"VErify EXP",
        //     });
        User.find({},function(err,usr){
            
            return res.render('unverifieduser', {
                title: "UNIVERIFIED USER",
                USER: usr,
            });
        });
}

module.exports.deleteduser = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
    let id = req.query.id;
    User.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting");
            return;
        }
        return res.redirect('back');
    })
}

module.exports.verifieduser = function(req,res){
    // console.log("in deleting");
    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
    let id = req.query.id;
    // console.log(id);
    User.findOneAndUpdate({_id: id},{role:0},function(err){
        if(err){
            console.log("error in verifying user");
            return;
        }
        return res.redirect('back');
    });
}

module.exports.editexp = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('back');
    }

    let id = req.query.id;
    Experience.findOne({_id:id},function(err,exp){
            
        return res.render('edit', {
            
            title: "UNIVERIFIED EXPERIENCE / EDIT ",
            exp: exp,
        });
    });
}

module.exports.updateexps = function(req, res){
    Experience.findOneAndUpdate({_id: req.body.id},{
        Student_Name:req.body.Student_Name,
        cgpa: req.body.cgpa,
        Student_Roll: req.body.Student_Roll,
        department: req.body.department,
        yearofGraduation: req.body.yearofGraduation,
        Company_Name: req.body.Company_Name,
        applied_role: req.body.applied_role,
        ctc: req.body.ctc,
        topics_prep: req.body.topics_prep,
        prep_time: req.body.prep_time,
        resource: req.body.resource,
        prep_tips: req.body.prep_tips,
        elig_cri: req.body.elig_cri,
        resume_tips: req.body.resume_tips,
        reason: req.body.reason,
        int_1: req.body.int_1,
        experience: req.body.experience,
        suggestions: req.body.suggestions

    },function(err){
        if(err){
            console.log("error in updating user");
            return;
        }
        return res.redirect('../users/verifyexp');
    });
}