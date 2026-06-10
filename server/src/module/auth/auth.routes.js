import {validate} from '../../common/middleware/validate.middleware.js'
import {RegisterDto, LoginDto, ResetPasswordDto, } from './dto/index.js'
import {authenticate} from './auth.middleware.js'
import {register, login, logout, refresh, resetPassword} from './auth.controller.js'
import {Router} from 'express'


const router = Router()

router.post('/register',validate(RegisterDto),register)
router.post('/login',validate(LoginDto),login);
router.post('/refresh',refresh);
router.post('/logout',authenticate,logout);
router.post('/reset-password',
  authenticate,
  validate(ResetPasswordDto),
  resetPassword
)

export default router;