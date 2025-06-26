var authDao = require("../Dao/authDao")
var jwt = require('jsonwebtoken')

async function loginUser(data){
    var result = await authDao.loginUserDao(data)
    if( result && result.password){
        var token = jwt.sign(data,'secretKey')
        result = {name:result.username, email:result.email, id:result._id,token}
    }
    return result
}

function registerUser(data){
    var res = authDao.regUserDao(data)
    return res
}

module.exports={
    registerUser,
    loginUser
}