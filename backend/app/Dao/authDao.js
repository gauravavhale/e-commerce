var getDBConnection = require ('../Common/getDbConnections')

async function loginUserDao(data){
    var db = await getDBConnection()
    var collection = db.collection("users")
    var result = await collection.findOne({email:data.email, password:data.password})
    if(!result){
        throw new Error('wrong email, password || User Not Registered')
    }
    return result
}

async function regUserDao (data){
    var db = await getDBConnection()
    var collection = db.collection('users')
    var existingUser =  await collection.findOne({email:data.email})
    if(existingUser){
         throw new Error("User Already Exists");
    }
    var result = await collection.insertOne(data)
    return result
}

module.exports={
    regUserDao,
    loginUserDao
}