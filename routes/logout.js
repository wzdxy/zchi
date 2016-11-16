/**
 * Created by Z on 2016/11/16.
 */
var express = require('express');
var router = express.Router();
// var db = require('../db.js');

router.get('/',function (req,res) {
    req.session.sign=false;
    res.redirect('/index');
});

module.exports = router;