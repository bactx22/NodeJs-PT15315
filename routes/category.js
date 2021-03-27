import express from 'express';
const router = express.Router();
import {create,list,categoryById,update,remove,read} from '../controllers/category'

//Tạo danh mục
router.post('/category', create);
//list danh sách danh mục
router.get('/categories', list);
//update danh muc
router.put('/category/:categoryId',update)
//lấy id
router.param('categoryId', categoryById)
//xoá danh mục
router.delete('/category/:categoryId', remove)
//detail
router.get('/category/:categoryId',read)
module.exports = router;