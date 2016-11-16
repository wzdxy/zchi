var express = require('express');
var router = express.Router();
var db = require('../db.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function (req, res) {
    let blogId = req.query.blogId;

    let commentQuery={postid:blogId};
    let commentResult=[];
    let commentcollection=db.collection('comment');
    commentcollection.find(commentQuery).toArray(function (err, result) {
        // console.dir(result);
        commentResult=result;
    })

    let blogQuery = {uid: blogId};
    let blogscollection = db.collection('blogs');
    blogscollection.find(blogQuery).toArray(function (err, result) {
        // console.dir(result);
        res.render('blog', {title: result[0].title, text: result[0].text, blogId: blogId,comments:commentResult});
    });


})

router.post('/comment', function (req, res) {
    console.log(req.body);
    let username = req.body.username;
    let text = req.body.text;
    let email = req.body.email;
    let postid = req.body.postid;
    let time = new Date().getTime().toString();
    let collection = db.collection('comment');
    collection.insert({
        postid: postid,
        username: username,
        text: text,
        email: email,
        time: time,
    }, function () {
        console.log('new comment[' + username + ':' + text + ']');
        res.end();
    });

})

module.exports = router;
