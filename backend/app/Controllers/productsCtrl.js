var express = require ('express')
var router = express.Router()
var products = require('../Services/productsService')

router.get('/get-products',async function(req,res,next){
    try{
        var result = await products.getProducts()
        res.send(result)
    } catch(e){
        res.status(500).send(e);
    }
})

router.get('/product-by-id/:id',async function(req, res, next){
    try{
        const id = req.params.id
        var result = await products.getProductById(id)
        res.json(result)
    } catch (e){
        res.status(500).send(e)
    }
})


router.get('/products-by-category/:cat',async function(req,res,next){
    try{
    const cat = req.params.cat
    var result = await products.getProductsByCategory(cat)
    res.send(result)
    } catch(e){
        res.status(500).send(e);
    }
})

module.exports=router;  