import express from 'express'
import {userSignupValidator} from '../validator/'
const router = express.Router();

import { signup, signin, signout, } from "../controllers/auth"

//router.post
router.post('/signup',userSignupValidator, signup)

module.exports = router;