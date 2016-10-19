/**
 * Created by hynra on 9/22/16.
 */

var crypto = require('crypto');
var moment = require('moment');
var configs = require('./config');


var reports = configs.db.collection('reports');

/* tambah report */

addNewReport = function (newData, callback) {
    newData.pass = hash;
    newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    newData.isVerified = false;
    reports.insert(newData, {safe: true}, callback);
}

getReport = function (callback) {
    reports.find().toArray(function (e, o) {
        callback(null, o);
    });
}
/*login = function(user, pass, callback)
 {
 users.findOne({user:user}, function(e, o) {
 if (o == null){
 callback('Username atau password tidak cocok');
 }	else{
 validatePassword(pass, o.pass, function(err, res) {
 if (res){
 callback(null, o);
 }	else{
 callback('Username atau password tidak cocok');
 }
 });
 }
 });
 }

 //---- get user role 3
 getDriver = function(user, callback)
 {
 users.findOne({user: user}, function(e, o) {
 if (o == null){
 callback('Username tidak terdaftar');
 }	else{
 users.find({role: '2'}).toArray(function(e, o) {
 if(o == null){
 callback('nullssss');
 }else {
 callback(null, o);
 }
 });
 }
 });
 }

 update = function(user, lat, lon, location, callback)
 {
 var date = moment().format('MMMM Do YYYY, h:mm:ss a');
 users.updateOne({user:user},{ $set: { "latitude": lat, "longitude": lon, "location": location, "date": date } },
 function(e, o) {
 console.log(o);
 //callback();
 callback(null, o);
 });
 }

 var validatePassword = function(plainPass, hashedPass, callback)
 {
 var salt = hashedPass.substr(0, 10);
 var validHash = salt + md5(plainPass + salt);
 callback(null, hashedPass === validHash);
 }

 var generateSalt = function()
 {
 var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
 var salt = '';
 for (var i = 0; i < 10; i++) {
 var p = Math.floor(Math.random() * set.length);
 salt += set[p];
 }
 return salt;
 }

 var md5 = function(str) {
 return crypto.createHash('md5').update(str).digest('hex');
 }

 var saltAndHash = function(pass, callback)
 {
 var salt = generateSalt();
 callback(salt + md5(pass + salt));
 }*/


module.exports = {
    getReport: getReport
};