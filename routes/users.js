const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
   
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/form',usersController.form);
router.post('/createform', usersController.createform);
router.post('/create', usersController.create);
router.get('/verifyexp', usersController.verifyexp);
router.get('/good', usersController.verified);
router.get('/delete', usersController.deleted);
router.get('/verifyusers', usersController.verifyuser);
router.get('/gooduser', usersController.verifieduser);
router.get('/deleteuser', usersController.deleteduser);
router.get('/editexp', usersController.editexp);
// router.get('/update',usersController.update);
router.post('/updateexp',usersController.updateexps);
router.post('/updatewithmsg',usersController.message);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);
router.get('/auth/google', passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/signin'}), usersController.createSession);
router.get('/updateprofile',usersController.updateprofile);
router.post('/updateform' , usersController.updateform);
router.get('/choosestu',usersController.choosestu);

module.exports = router;