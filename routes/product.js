import express from 'express';
import {list, create , productById, read, update, remove} from '../controllers/product';
const router = express.Router();


//list product
router.get('/products', list);

//detail product
router.get('/product/:productId', read);

//xoa product
router.delete('/product/:productId', remove)

router.param('productId', productById);

//theem sp
router.post('/products', create);

//update product

router.put('/product/:productId',update)

module.exports = router;