var express = require('express');
var router = express.Router();
var users = require('../models/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET dashboard. */
router.get('/dashboard', function(req, res, next) {
    var islogged = req.session.islogged;
    if(islogged == null){
        res.redirect('/users/login');
    }else {
        res.render('dashboard-v1', {title: 'Express'});
    }
});

/* GET dashboard. */
router.get('/map', function(req, res, next) {
    var islogged = req.session.islogged;
    if(islogged == null){
        res.redirect('/users/login');
    }else {
        var dataRes = {};
        getDriver(req.session.username, function(result) {
            // return value is here
            console.log(result);
            dataRes = result;
        });
        res.render('maps', {title: 'Express', data: dataRes});
    }
});

/* GET dashboard. */
router.get('/user', function(req, res, next) {
    res.render('user', { title: 'Express' });
});


function getDriver(username, callback) {
    users.getDriver(username, function(e, o){
        var dataRes = {};
        var status = {};
        if (!o){
            status.code = 400;
            status.success = false;
            status.msg = e;
            dataRes.status = status;
            console.log(dataRes);
            req.body = false;
            callback(dataRes);
        }	else{
            status.code = 200;
            status.success = true;
            status.msg = 'Data ditemukan';
            dataRes.status = status;
            dataRes.data = o;
            console.log(dataRes);
            callback(dataRes);
        }
    });
}

module.exports = router;
