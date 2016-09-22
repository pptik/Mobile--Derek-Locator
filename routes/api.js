var express = require('express');
var router = express.Router();
var users = require('../models/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* Signup */
router.post('/signup', function(req, res){
    users.addNewAccount({
        name 	: req.body['name'],
        email 	: req.body['email'],
        user 	: req.body['user'],
        pass	: req.body['pass'],
        role    : req.body['role'],
        id_unit : req.body['id_unit']
    }, function(e, o){
        var dataRes = {};
        var status = {};
        if (e){
            status.code = 400;
            status.success = false;
            status.msg = e;
            dataRes.status = status;
            res.status(400).send(dataRes);
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
            res.status(400).send(dataRes);
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
            res.status(400).send(dataRes);
        }
    });
});



module.exports = router;
