import express from 'express'
import * as authController from '../../controller/auth.controller'

const router = express.Router()

router.get('/', authController.getAccountData)
router.post('/', authController.login)

export default router
