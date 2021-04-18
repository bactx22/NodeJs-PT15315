import Category from '../models/category'
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash'


export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Them danh mục ko thanh cong"
            })
        }
        const { name} = fields;
        if (!name ) {
            return res.status(400).json({
                error:"Ban can nhap day du thong tin"
            })
        }
        let category = new Category(fields);
        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error:"nen up anh duoi 1mb"
                })
            }
            category.photo.data = fs.readFileSync( files.photo.path );
            category.photo.contentType = files.photo.path;
        }
        category.save(( err, data )=> {
            if (err) {
                res.status(400).json({
                    error:"Ko them san pham"
                })
            }
            res.json(data)
        })
    })
}

export const list = (req, res) => {
    Category.find().select("-photo")
        .exec((err, data) => {
        if (err) {
            error:"Không tìm thấy danh mục"
        }
        res.json({data})
    })
}

export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Sửa danh mục ko thanh cong"
            })
        }
        const { name} = fields;
        if (!name ) {
            return res.status(400).json({
                error:"Ban can nhap day du thong tin"
            })
        }
        let category = req.category;
        category = _.assign(category, fields);
        
        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error:"nen up anh duoi 1mb"
                })
            }
            category.photo.data = fs.readFileSync( files.photo.path );
            category.photo.contentType = files.photo.type;
        }
        category.save(( err, data )=> {
            if (err) {
                res.status(400).json({
                    error:"Ko them san pham"
                })
            }
            res.json(data)
        })
    })
}

export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Không xoá được danh mục"
            })
        }
        res.json({
            deleteCategory,
            message:"Danh mục đã xoá"
        })
    })
}


export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error:"Khong tim thay danh muc"
            })
        }
        req.category = category;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.category);
}
export const photo = (req, res, next) => {
    if (req.category.photo.data) {
        res.set("Content-Type", req.category.photo.contentType);
        return res.send(req.category.photo.data);
    }
    next();
}

