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
            dataRes = result;
            //console.log(dataRes);
            var arr = [];
            arr = dataRes.data;
            console.log(arr.length);
            var arrLocs = [];
            for (var i = 0; i < arr.length; i++){
                arrLocs[i] = [arr[i].location, arr[i].latitude, arr[i].longitude];
            }
            console.log(arrLocs);
            res.render('maps', {title: 'Express', data: arrLocs});
        });

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
            req.body = false;
            callback(dataRes);
        }	else{
            status.code = 200;
            status.success = true;
            status.msg = 'Data ditemukan';
            dataRes.status = status;
            dataRes.data = o;
            callback(dataRes);
        }
    });
}

module.exports = router;
