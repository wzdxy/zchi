var Db = require('mongodb').Db,
    Server = require('mongodb').Server;
var db = new Db('test', new Server('localhost', 27017));

db.open(function(err, db) {
	console.log('dbopen');
	db.collection('users',{safe:true},function(err,collection){
		if(err)throw err;
		collection.find().toArray(function(e,docs){
             if(e) throw e ;
             console.log(docs) ;
         }) ; 
	})
});

module.exports=db;