const router = express.Router();
import express from 'express'
import { userById, read, update } from '../controllers/user'
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});


router.param('userId', userById)
router.get('/user/:userId',requireSignin,isAuth, read);
router.put('/user/:userId',requireSignin,isAuth, update);

module.exports = router;    