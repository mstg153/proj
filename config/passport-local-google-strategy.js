const passport = require('passport');
const googleStrategy  = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID:"667822981218-0eet7qocdu5fn9fph8qocmphsir7vsqu.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,usr) {
            if(err){
                console.log("error in google Strategy oath");
                return ;
            }
            console.log(profile);
            if(usr){
                return done(null,usr);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password : crypto.randomBytes.toString('hex'),

                },function(err,usr){
                    if(err){
                        console.log("error in google Strategy oath part 2");
                        return ;
                    }
                    return done(null,usr);
                });
            }
        })
    }

));


module.expors = passport;