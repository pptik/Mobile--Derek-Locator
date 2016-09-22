var express = require('express');
var router = express.Router();
var users = require('../models/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


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

module.exports = router;
