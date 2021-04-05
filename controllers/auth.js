import User from "../models/user"
import auth from "../models/user"

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