var express = require('express');
var router = express.Router();
var users = require('../models/users.js');
var reports = require('../models/report.js');

/* routing default. */
router.get('/', function (req, res, next) {
    res.redirect('/dashboard')
});


router.get('/dashboard', function (req, res, next) {
    var islogged = req.session.islogged;
    if (islogged == null) {
        res.redirect('/users/login');
    } else {
        res.redirect('/map');
    }
});

/* penampilan peta. */
router.get('/map', function (req, res, next) {
    var islogged = req.session.islogged;
    if (islogged == null) {
        res.redirect('/users/login');
    } else {
        var dataRes = {};
        var dataResReports = {};

        getDriver(req.session.username, function (result) {
            dataRes = result;
            console.log("data res: " + dataRes);
            var arr = [];
            arr = dataRes.data;
            console.log(arr.length);
            var arrLocs = [];
            for (var i = 0; i < arr.length; i++) {

                arrLocs[i] = [arr[i].location, arr[i].latitude,
                    arr[i].longitude, i + 1, arr[i].name, arr[i].id_unit, arr[i].nomor_telepon, arr[i].date];
            }

            //get report
            var arrLocsReports = [];
            var arrReports = [];
            getReport(function (result) {
                dataResReports = result;
                console.log("data res report: " + JSON.stringify(dataResReports));
                var arr = [];
                arr = dataResReports.data;
                console.log("panjang array data res report: " +arr.length);
                //var arrLocs = [];
                for (var i = 0; i < arr.length; i++) {

                    arrLocsReports[i] = [arr[i].location, arr[i].latitude,
                        arr[i].longitude, i + 1, arr[i].name, arr[i].id_unit, arr[i].nomor_telepon, arr[i].date];
                }
                console.log("map nih: " + arrLocs);
                console.log("report nih: " + arrLocsReports);
                //res.render('maps', {title: 'Express', data: arrLocs, dataDriver: dataRes}); backup sebelum digabung untuk menampilkan report
                res.render('maps', {title: 'Express', dataDrivers: arrLocs, dataReports: arrLocsReports});
            });
            //akhir get report


            //
        });

    }
});

/* GET dashboard. */
/*router.get('/user', function(req, res, next) {
 res.render('user', { title: 'Express' });
 });*/


function getDriver(username, callback) {
    users.getDriver(username, function (e, o) {
        var dataRes = {};
        var status = {};
        if (!o) {
            status.code = 400;
            status.success = false;
            status.msg = e;
            dataRes.status = status;
            req.body = false;
            callback(dataRes);
        } else {
            status.code = 200;
            status.success = true;
            status.msg = 'Data ditemukan';
            dataRes.status = status;
            dataRes.data = o;
            callback(dataRes);
        }
    });
}

function getReport(callback) {
    reports.getReport(function (e, o) {
        var dataRes = {};
        var status = {};

        status.code = 200;
        status.success = true;
        status.msg = 'Data ditemukan';
        dataRes.status = status;
        dataRes.data = o;
        callback(dataRes);

    });
}
module.exports = router;
