var mongo = require ('mongodb');
require('dotenv').config();

async function getDBConnection(){
    var url = process.env.MONGODB_URI;
    var mongoClient = mongo.MongoClient;
    var mongoServer = await  mongoClient.connect(url)
    var db = mongoServer.db("swift-cart")
    return db
}

module.exports=getDBConnection