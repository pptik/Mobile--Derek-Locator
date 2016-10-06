var express = require('express');
var router = express.Router();
var users = require('../models/users.js');
var report = require('../models/report');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Signup */
router.post('/signup', function(req, res){
    var param = {
        name 	: req.body['name'],
        email 	: req.body['email'],
        nomor_telepon : req.body['nomor_telepon'],
        user 	: req.body['user'],
        pass	: req.body['pass'],
        role    : req.body['role'],
    };
    if(req.body['role'] == '2'){
        param = {
            name 	: req.body['name'],
            email 	: req.body['email'],
            nomor_telepon : req.body['nomor_telepon'],
            user 	: req.body['user'],
            pass	: req.body['pass'],
            role    : req.body['role'],
            id_unit : req.body['id_unit'],
            latitude: "0",
            longitude: "0",
            location: "none"
        }
    }
    users.addNewAccount(param, function(e, o){
        var dataRes = {};
        var status = {};
        if (e){
            status.code = 400;
            status.success = false;
            status.msg = e;
            dataRes.status = status;
            res.status(200).send(dataRes);
        }	else{
            status.code = 200;
            status.success = true;
            status.msg = 'Sukses membuat akun';
            dataRes.status = status;
            dataRes.data = o.ops[0];
            res.status(200).send(dataRes);

        }
    });
});

router.post('/login', function(req, res){
    users.login(req.body['user'], req.body['pass'], function(e, o){
        console.log(req.body['user'] +', '+req.body['pass']);
        var dataRes = {};
        var status = {};
        if (!o){
            status.code = 400;
            status.success = false;
            status.msg = e;
            dataRes.status = status;
            console.log(dataRes);
            req.body = false;
            res.status(200).send(dataRes);
        }	else{
            if (req.body['remember-me'] == 'true'){
                res.cookie('user', o.user, { maxAge: 900000 });
                res.cookie('pass', o.pass, { maxAge: 900000 });
                status.remember = true;
            }
            status.code = 200;
            status.success = true;
            status.msg = 'Login berhasil';
            dataRes.status = status;
            dataRes.data = o;
            console.log(dataRes);
            //    res.status(200).send(dataRes);
            console.log(dataRes);
            var random = Math.random().toString();
            res.status(200).send(dataRes);
        }
    });
});


router.post('/postreport', function(req, res){
    report.addReport({
        user 	    : req.body['user'],
        nomor_telepon : req.body['nomor_telepon'],
        location    : req.body['location'],
        latitude    : req.body['latitude'],
        longitude   : req.body['longitude']
    }, function(e, o){
        var dataRes = {};
        var status = {};
        if (e){
            status.code = 400;
            status.success = false;
            status.msg = e;
            dataRes.status = status;
            res.status(200).send(dataRes);
        }	else{
            status.code = 200;
            status.success = true;
            status.msg = 'Sukses membuat report';
            dataRes.status = status;
            dataRes.data = o.ops[0];
            res.status(200).send(dataRes);

        }
    });
});


router.post('/updateuser', function(req, res){
    users.update(req.body['user'], req.body['latitude'],req.body['longitude'], req.body['location']
    , function(e, o){//error dan oke
        var dataRes = {};
        var status = {};
        if (e){//error
            status.code = 400;
            status.success = false;
            status.msg = e;
            dataRes.status = status;
            res.status(200).send(dataRes);
        }	else{
            status.code = 200;
            status.success = true;
            status.msg = 'updated';
            dataRes.status = status;
            dataRes.data = o;
            res.status(200).send(dataRes);

        }
    });
});


module.exports = router;
