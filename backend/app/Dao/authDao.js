var getDBConnection = require ('../Common/getDbConnections')

async function loginUserDao(data){
    var db = await getDBConnection()
    var collection = db.collection("users")
    var result = await collection.findOne({email:data.email})
    if(!result){
        throw new Error('User Not Registered')
    }
    if(result.password !== data.password){
        throw new Error('Wrong Password')
    }
    return result
}

async function regUserDao (data){
    var db = await getDBConnection()
    var collection = db.collection('users')
    var existingUser = await collection.findOne({email:data.email})
    if(existingUser){
        throw new Error('User Already Registered')
    }
    var result = await collection.insertOne(data)
    if(result){
        var user = await collection.findOne({_id:result.insertedId})
        return user;
    } else {
        throw new Error('User Registration Failed')
    }
}

module.exports={
    regUserDao,
    loginUserDao
}