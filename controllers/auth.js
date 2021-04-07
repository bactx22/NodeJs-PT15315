import User from "../models/user"
import auth from "../models/user"
const jwt = require('jsonwebtoken')

export const signup = (req, res) => {
    const user = new User(req.body);
    console.log(user)
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error:"Không thể thêm "
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({user})
    })
}
export const signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                eror:'User with that email dose not exist.'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error:'Email and pasword not match'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { exprire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json({
            token, user:{_id,name,email,role}
        })
    })
}

export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denined"
        })
    }
    next();
}