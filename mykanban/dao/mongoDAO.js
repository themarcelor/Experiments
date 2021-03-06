#!/usr/bin/jjs -cp mongo-2.10.1.jar -scripting
#
/*
  Author: Marcelo Rodrigues
  Email: themarcelor@gmail.com
  Date: May 2013
*/
load('./mykanban/dao/mongoConnector.js');

var mongoDAO = (function() {
    //Get connector from singleton
    var mongo = mongoConnector.getInstance();
    
    //Select db
    var db = mongo.getDB("test");

    // get list of collections
    var collections = db.getCollectionNames();
 
    //Get mongodb collection
    var dbCollection = mongo.getDB("test").getCollection("test");

    return {
	create: function(someObj) {
	    //save
            dbCollection.save(JSON.parse(someObj));
	},
	readAll: function() {
	    var results = [];
	    
	    var cursorDocJSON = dbCollection.find();
	    
	    while (cursorDocJSON.hasNext()) {
		var cDoc = cursorDocJSON.next();
		results.push(cDoc);
	    }
	    return results;
	},
	delete: function(id) {
	    //delete
	    print("Type of 3: " + typeof '3');
	    print("Type of query: " + typeof "{ '_id' : '3' }" );
	    print("Type of id: " + typeof id);	    
	    //Weird bug here!
	    print("Type of query: " + typeof "{ '_id' : '"+id+"' }" );

	    //workaround:
	    var idStr = Number(id);

	    var jsonToDelete = "{ '_id' : '"+idStr+"' }";

	    var cursor = dbCollection.find(JSON.parse(jsonToDelete));
	    var obj = cursor.next();	    
            dbCollection.remove(obj);
	}
	
    };
    
}());