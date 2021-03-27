import Category from '../models/category'



export const create = (req, res) => {
const category = new Category(req.body);
category.save((err, data) => {
    if (err) {
        res.status(400).json({
            error: "Add category failed"
        })
    }
    res.json(data);
    })
}


export const list = (req, res) => {
    Category.find((err, data) => {
        if (err) {
            error:"Không tìm thấy danh mục"
        }
        res.json({data})
    })
}

export const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err || !category) {
            res.status(400).json({
                error:"Danh mục này không tồn tại"
            })
        }
        res.json({data})
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