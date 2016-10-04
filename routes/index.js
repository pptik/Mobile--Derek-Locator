var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET dashboard. */
router.get('/dashboard', function(req, res, next) {
    var islogged = req.session.islogged;
    console.log(islogged);
    if(islogged == null){
        res.redirect('/users/login');
    }else {
        res.render('dashboard-v1', {title: 'Express'});
    }
});

/* GET dashboard. */
router.get('/map', function(req, res, next) {
    res.render('maps', { title: 'Express' });
});

/* GET dashboard. */
router.get('/user', function(req, res, next) {
    res.render('user', { title: 'Express' });
});

module.exports = router;
