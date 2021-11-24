const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/read_articles', homeController.home);
router.post('/read_articles', homeController.home);
router.get('/',homeController.index);
router.use('/users', require('./users'));
router.get('/articles', homeController.article);
router.get('/creators',homeController.creators);
// router.post('/filter',homeController.filter);

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;