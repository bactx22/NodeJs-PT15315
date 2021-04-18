import express from 'express';
import { list, create, productById, read, update, remove, photo } from '../controllers/product';
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
import { userById } from '../controllers/user'
const router = express.Router();


//list product
router.get('/products', list);

//detail product
router.get('/product/:productId', read);

//xoa product
router.delete('/product/:productId/:userId',requireSignin,isAuth, isAdmin, remove)


//theem sp
router.post('/products',requireSignin,isAuth, isAdmin, create);

//update product

router.put('/product/:productId/:userId',requireSignin,isAuth, isAdmin,update)

//đọc ảnh
router.get("/product/photo/:productId", photo)
//Lấy id
router.param('productId', productById);
router.param('userId', userById)
module.exports = router;