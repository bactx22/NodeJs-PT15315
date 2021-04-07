const router = express.Router();
import express from 'express'
import{userById} from '../controllers/user'

router.param('userId',userById)

module.exports = router;