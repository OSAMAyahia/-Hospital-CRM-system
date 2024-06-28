const User = require('../schema/users')
const sendMail = require('../utlis/SendMail')
const {newErorr,catchAsync} = require('../utlis/errorhandler')
const crypto = require('crypto')
const send = require('../utlis/cookie')
const jwt = require('jsonwebtoken')
exports.signup = catchAsync(async (req, res, next) => {
        if (mail = await User.findOne({ email: req.body.email })) {
         return  res.status(404).json("this email is alredy finded")  
        } 
        const users = await User.create(req.body)
      send(req,res,200,users)})

exports.login =catchAsync( async (req, res,next) => {
       const  users =  await User.findOne({ email: req.body.email })
        if (!users || !(await  users.compare(req.body.password, users.password))) {
          return next(new newErorr(401,"the email or password is incorrect")); }send(req,res,200,users)
})
exports.protect =catchAsync( async (req, res, next) => {
    if (!req.headers.authorization) { 
      return next(new newErorr(401, 'You must login first' ));
} 
    const token = req.headers.authorization.split(' ')[1]
       const tokens = jwt.verify(token, process.env.SECRECT)
   const user=await User.findById(tokens.id)
    if (!user) {
      return next(new newErorr(401,'your token is not correct' ));
    }
    req.current = user;
    console.log(user.role)
    next()
})
 
exports.restrictTo = (...role) => {
  return(req,res,next) => {
    if (!role.includes(req.current.role)) {
      return next(new newErorr(401, 'you are not have a pemission to this' ));
    }
    next() }}
 
exports.forgetpasswaord =catchAsync(async(req,res,next) => {

  const email = req.body.email
  const user =await User.findOne({ email: email })
  if (!user) {
    return next(new newErorr(401 ,'this email not valid' ));
    }
    console.log(user)
    codes=user.forgetPassword()
    await user.save({ validateBeforeSave: false })
    options={message: `Hello ${user.name},\n we've received a request to reset your password for your account.
    If you didn't make this request, don't worry.
    Your account is still secure, and no action is needed.\n${codes}`, subject:"your reset code", email:user.email}
    sendMail(options)
    res.status(200).json({ success: true,message: 'we send reset code plz check you email'  })
})

exports.ResetPassword =catchAsync(async(req,res,next) => {
    const code = crypto.createHash('sha256').update(req.params.code).digest('hex')
    const user = await User.findOne({ passwordResetToken: code , passwordResetExpires : {$gt: Date.now()}})
    if (!user) {
      return next(new newErorr(401,'this passwordResetToken not valid' ));}
    user.password = req.body.password
    user.confirmation_password = req.body.confirmation_password
    user.passwordResetToken = undefined
    await user.save()
    res.status(200).json({ success: true,message: 'your password has been changed'  })

})
exports.changepassword =catchAsync(async(req,res,next) => {
    const user = await User.findById(req.current.id);
    if (!user) {
      return next(new newErorr(401,"please log in first"));}
    if (!( await user.compare( req.body.current_password,user.password))) {
      return next(new newErorr(401, 'current_password is not correct' ));
    };
    user.password = req.body.password
    user.confirmation_password = req.body.confirmation_password
    await user.save()
    res.status(200).json({ success: true,message: 'your password has been changed'  })
}
 )