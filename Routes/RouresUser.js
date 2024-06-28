const express = require('express');
const router = express.Router();
const User=require('../Controller/ControllerUsers')
router.route('/signup').post(User.signup)
router.route('/login').post(User.login)
router.route('/ForgetPassword').post(User.forgetpasswaord)
router.route('/changepassword').post(User.protect,User.changepassword)
router.route('/ResetPassword/:code').post(User.ResetPassword)


module.exports = router 
