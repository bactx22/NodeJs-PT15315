import express from 'express';
import { create , productById, read, remove} from '../controllers/product';
const router = express.Router();


//list product
router.get('/products',(req,res)=> {
    res.json({
        message : "hi"
    })
})
//detail product
router.get('/product/:productTd', read);
router.delete('/product/:productTd',remove)
router.param('productTd', productById);
//theem sp
router.post('/products', create);

module.exports = router;