var userDao = require('../Dao/productsDao')

function getProducts(){
    var res = userDao.getProductsDao()
    return res
}

function getProductById(id){
    var res = userDao.getProductsByIdDao(id)
    return res
}

function getProductsByCategory(cat){
    var res = userDao.productsByCategoryDao(cat)
    return res
}


module.exports={
    getProducts,
    getProductById,
    getProductsByCategory
}