import express from 'express';
import { create } from '../controllers/product';
const router = express.Router();


//list product
router.get('/products',(req,res)=> {
    res.json({
        message : "hi"
    })
})
//detail product
router.get('/product/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: 'Product 1'
    })
})
//theem sp
router.post('/products', create)

module.exports = router;