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
        return res.redirect('users/sign-in');
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
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
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
            return;
        }
        return res.redirect('back');
    })
}
module.exports.verified = function(req,res){
    console.log("in deleting");
    if(!req.isAuthenticated()){
        return res.redirect('back');
    }
    let id = req.query.id;
    console.log(id);
    Experience.findOneAndUpdate(id,{status:1},function(err){
        if(err){
            console.log("error in deleting");
            return;
        }
        return res.redirect('back');
    });
    // Experience.findByIdAndDelete(id,function(err){
    //     if(err){
    //         console.log("error in deleting");
    //         return;
    //     }
    //     return res.redirect('back');
    // })
}