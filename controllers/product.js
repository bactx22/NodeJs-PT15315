import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash'

export const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Them san pham ko thanh cong"
            })
        }
        const { name, description, price } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                error:"Ban can nhap day du thong tin"
            })
        }
        let product = new Product(fields);
        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error:"nen up anh duoi 1mb"
                })
            }
            product.photo.data = fs.readFileSync( files.photo.path );
            product.photo.contentType = files.photo.path;
        }
        product.save(( err, data )=> {
            if (err) {
                res.status(400).json({
                    error:"Ko them san pham"
                })
            }
            res.json(data)
        })
    })
}

export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error:"Khong tim thay san pham"
            })
        }
        req.product = product;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.product);
}
export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Ko xoa duoc snan pham"
            })
        }
        res.json({
            product: deleteProduct,
            message:"San pham da duoc xoa"
        })
    })
}

export const list = (req, res) => {
    Product.find().select("-photo")
        .exec((err, data) => {
        
        if (err) {
            error: "Kh??ng t??m th???y s???n ph???m"
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
                error: "S???a s???n ph???m kh??ng th??nh c??ng"
            })
        }
        const { name, description, price } = fields;
        if (!name || !description || !price) {
            return res.status(400).json({
                error:"Ban can nhap day du thong tin"
            })
        }
        // let product = new Product(fields);
        let product = req.product;
        product = _.assignIn(product, fields);


        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error:"N??n up ???nh d?????i 1mb"
                })
            }
            product.photo.data = fs.readFileSync( files.photo.path );
            product.photo.contentType = files.photo.type;
        }
        product.save(( err, data )=> {
            if (err) {
                res.status(400).json({
                    error:"Kh??ng s???a ???????c s???n ph???m"
                })
            }
            res.json(data)
        })
    })
}

//?????c ???nh
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}



























