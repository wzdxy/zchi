var express = require('express');
var router = express.Router();
var db=require('../db.js');

/* GET home page. */
router.get('/', function(req, res) {
  let collection=db.collection('blogs');
  let array=[]
  collection.find({}).toArray(function(err,result){
    // console.dir(result);
    array=result;
    res.render('index',{array:array});
  })
});

router.get('/index', function(req, res) {
  let collection=db.collection('blogs');
  let array=[];
  let user=0;
  if(req.session.sign==true)user=req.session.username;
  collection.find({hidden:false}).toArray(function(err,result){
    array=result;
    res.render('index',{array:array,user:user});
  })
});

router.get('/login',function(req,res){
  res.render('login',{title:'login'});
});

module.exports = router;
