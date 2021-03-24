import express from 'express';
import {list, create , productById, read, update, remove} from '../controllers/product';
const router = express.Router();


//list product
router.get('/products', list);

//detail product
router.get('/product/:productTd', read);

//xoa product
router.delete('/product/:productTd', remove)

router.param('productTd', productById);

//theem sp
router.post('/products', create);

//update product

router.put('/product/:productTd',update)

module.exports = router;