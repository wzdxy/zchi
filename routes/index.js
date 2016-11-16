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
  let array=[]
  let user=0;
  if(req.session.sign==true)user=req.session.username;
  collection.find({}).toArray(function(err,result){
    // console.dir(result);
    array=result;
    res.render('index',{array:array,user:user});
  })
});

router.get('/login',function(req,res){
  res.render('login',{title:'login'});
})

// router.get('/blog',function(req,res){
//   let blogId=req.query.blogId;
//   let collection = db.collection('blogs');
//   let query={uid:blogId};
//   // collection.find(query).toArray(function(err,result){
//   //   console.dir(result);
//   // })
//   collection.find(query).toArray(function(err,result){
//     console.dir(result);
//     res.render('blog',{title:result[0].title,text:result[0].text});
//   })
//   // res.render('blog',{blogId:blogId});
// })

// router.get('/ucenter',function(req,res){
//   res.render('index',{title:'ERROR'});
// })

// router.post('/ucenter',function(req,res){
//   var query={name:req.body.name,pw:req.body.password};
//   var collection = db.collection('users');
//   collection.find(query).toArray(function(err,result){
//     if(result.length==1){
//       console.dir(result);
//       res.render('usercenter',{title:'UserCenter',name:query.name});
//     }else{
//       res.redirect('/')
//     }
//   })
// });

// router.post('/postblog',function(req,res){
//     let text=req.body.text;
//     let title=req.body.title;
//     let date=new Date();
//     let uid=date.getTime().toString();
//     console.log(title);
//     console.log(text);
//     console.log(uid);
//     var collection = db.collection('blogs');
//     collection.insert({
//       uid:uid,
//       title:title,
//       text:text      
//     },function(){
//       console.log('数据库写入完成');
//     })
//     res.render('postsuccess',{text:text});
// });

module.exports = router;
