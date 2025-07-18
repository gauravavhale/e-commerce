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

async function registerUser(data){
    var user = await authDao.regUserDao(data)
    if(user && user._id){
        var token = jwt.sign(data, 'secretKey');
        result = {name:user.username, email:user.email, id:user._id, token}
    }
    return result;
}

module.exports={
    registerUser,
    loginUser
}