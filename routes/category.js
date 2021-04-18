import express from 'express';
const router = express.Router();
import { create, list, categoryById, update, remove, read, photo } from '../controllers/category'
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
import { userById } from '../controllers/user'

//Tạo danh mục
router.post('/category/:userId',requireSignin,isAuth, isAdmin, create);
//list danh sách danh mục
router.get('/categories', list);
//update danh muc
router.put('/category/:categoryId/:userId',requireSignin,isAuth, isAdmin,update)
//xoá danh mục
router.delete('/category/:categoryId/:userId',requireSignin,isAuth, isAdmin, remove)
//detail
router.get('/category/:categoryId', read)
//đọc ảnh
router.get("/category/photo/:categoryId", photo)
//lấy id
router.param('categoryId', categoryById)
router.param('userId', userById)
module.exports = router;