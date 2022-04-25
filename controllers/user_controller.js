const User = require('../models/user');
const Experience = require('../models/experiences');
const Selection = require('../models/selection');
const recievedmailer = require('../mailer/recievedmailer');
const publishedmailer = require('../mailer/publishedmailer');


module.exports.profile = async function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('users/sign-in');
    }

    let id = req.user._id;

    let exp =await Experience.find({user:id});
        
    return res.render('user_profile',{
        title:req.user.name,
        experience: exp,
    });
    
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })
}

module.exports.updateprofile = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('users/sign-in');
    }
    return res.render('updateprofile',{
        title: 'Update Profile'
    });
}

module.exports.form = function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in');
    }

    return res.render('form', {
        title: 'Experience Form'
    })
}
//updating user
module.exports.updateform = function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/signin');
    }
    User.findOneAndUpdate({_id: req.user.id}, {
        department : req.body.department,
        yearofGraduation : req.body.yearofGraduation,
        enroll : req.body.enroll
    },function(err){
        if(err){
            console.log("error in Updating");
            return;
        }
        req.flash('success','Updated succesfully');
        return res.redirect('/users/profile');
    });
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
        req.flash('error', 'Passwords do not match');
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
            req.flash('error','User already exists');
            return res.redirect('back');
        }

    });
}

module.exports.createform = async function(req,res){
    try{
        let exp = await Experience.create(req.body);
        // let upd = await Experience.
        // console.log(exp);
        
        let upt = await Experience.findOneAndUpdate({_id:exp._id},{user:req.user._id})

        let new_t = await User.findById(req.user._id);
        recievedmailer.received(new_t);
        req.flash('success', 'Experience submitted for review');
        return res.redirect('/users/profile');
    
    }catch(err){
        req.flash('error',err);
            return;
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','loggedin Successful');
    return res.redirect('/read_articles');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'logged out succesfully');
    return res.redirect('/read_articles');
}

module.exports.verifyexp = function(req,res){

    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
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
        req.flash('success','deleted Experience successfully');
        return res.redirect('back');
    })
}
module.exports.verified =async function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
    try{
        // console.log("in deleting");
        
        let id = await req.query.id;
        // console.log(id);
        // let exp = Experience.findById(id);
        // let usr = User.findById(exp.user);
        let exp = await Experience.findOneAndUpdate({_id:id},{status:1});
        // console.log(exp);
        let usr = await User.findById(exp.user);
        // console.log(usr);

        publishedmailer.published(id,usr.email);
        req.flash('success','verified Experience successfully');
        return res.redirect('back');
        
    }
    catch(err){
            console.log("error in deleting",err);
            return;
        
    }
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
        req.flash('success','deleted USER successfully');
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
        req.flash('success','Verified User successfully');
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
        suggestions: req.body.suggestions,
        message:""

    },function(err){
        if(err){
            console.log("error in updating user");
            return;
        }
        return res.redirect('../users/profile');
    });
}

module.exports.message = function(req, res){
    // console.log(req.body.id);
    Experience.findOneAndUpdate({_id: req.body.id},{
        message:req.body.message
    },function(err){
        if(err){
            console.log("error in updating user");
            return;
        }
        return res.redirect('back');
    });
}

module.exports.choosestu = finction(req,res){
    if (req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('choosestu', {
        title: 'Choose Stu',
        user: User  
    })
}