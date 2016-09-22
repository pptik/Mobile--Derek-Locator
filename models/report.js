/**
 * Created by hynra on 9/22/16.
 */

var configs = require('./config');
var report = configs.db.collection('report');
var users = configs.db.collection('users');
var moment = require('moment');

addReport = function(newData, callback)
{
    users.findOne({user:newData.user}, function(e, o) {
        if (o){
            newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
            report.insert(newData, {safe: true}, callback);

        }else{
            callback('Maaf, user tidak ditemukan');
        }
    });
}

module.exports = {
    addReport: addReport
};
