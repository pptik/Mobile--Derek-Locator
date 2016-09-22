/**
 * Created by hynra on 9/22/16.
 */

var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');

//---- mongodb var

/* Todo: ubah dengan db live*/
var dbName = process.env.DB_NAME || 'semut_demo';
var dbHost = process.env.DB_HOST || 'MacBookPro.local'
var dbPort = process.env.DB_PORT || 27017;

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
    if (e) {
        console.log(e);
    } else {
        if (process.env.NODE_ENV == 'live') {
            db.authenticate(process.env.DB_USER, process.env.DB_PASS, function(e, res) {
                if (e) {
                    console.log('mongo : error: not authenticated', e);
                }
                else {
                    console.log('mongo : authenticated and connected to database :: "'+dbName+'"');
                }
            });
        }	else{
            console.log('mongo : connected to database :: "'+dbName+'"');
        }
    }
});

var users = db.collection('users');

/* insert akun */

addNewAccount = function(newData, callback)
{
    users.findOne({user:newData.user}, function(e, o) {
        if (o){
            callback('Maaf, username telah digunakan');
            console.log('user : '+newData.user+' is used');
        }	else{
            users.findOne({email:newData.email}, function(e, o) {
                if (o){
                    console.log('email : '+newData.email+' is used');
                    callback('Maaf, email sudah digunakan');
                }else{
                    saltAndHash(newData.pass, function(hash){
                        newData.pass = hash;
                        newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                        newData.isVerified = false;
                        users.insert(newData, {safe: true}, callback);
                    });
                }
            });
        }
    });
}

/* Login */

login = function(user, pass, callback)
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

/* salt */
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
}


module.exports = {
    addNewAccount: addNewAccount,
    login: login
};