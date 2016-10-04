var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET dashboard. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard-v1', { title: 'Express' });
});

/* GET dashboard. */
router.get('/map', function(req, res, next) {
    res.render('maps', { title: 'Express' });
});

module.exports = router;
