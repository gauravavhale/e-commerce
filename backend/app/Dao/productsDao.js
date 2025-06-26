var getDBConnection = require ("../Common/getDbConnections")

async function getProductsDao(){
    var db = await getDBConnection()
    var collection = db.collection("products")
    var result = await collection.find({}).toArray()
    return result
}

async function getProductsByIdDao(id){
    var db =  await getDBConnection()
    var collection = db.collection("products")
    var result = await collection.findOne({id:Number(id)})
    return result
}

async function productsByCategoryDao(cat){
    var db = await getDBConnection()
    var collection = db.collection("products")
    var result = await collection.find({category : cat}).toArray()
    return result
}

module.exports={
    getProductsDao,
    getProductsByIdDao,
    productsByCategoryDao
}