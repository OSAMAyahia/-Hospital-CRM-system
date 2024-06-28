const mongoose = require('mongoose')
const bcryptjs=require('bcryptjs')
const validator = require('validator')
const crypto = require('crypto')
const user = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username required'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,  
            message: 'this email is not valid'
        },
        required: [true, 'email required'],
        unique: true
    },
    confirmation_password: {
        type: String,
        required: [true, 'confirmation_password is required'],
        validate: {
            validator: function (e) {
                return e === this.password;
            },
            message: 'passwords are not the same'
        }
    },
    role: {
        type: String // e.g., "Admin", "Doctor", "Receptionist"
    },
    passwordResetToken: String,
    passwordResetExpires: Date
});

user.pre(/^save/, async function (next) {
    if (!this.isModified) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 12)
    this.confirmation_password=undefined
    next()

})
user.methods.forgetPassword = function () {
    const resetcode = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetcode).digest('hex')
    this.passwordResetExpires=Date.now() + 1*1000*60
    return resetcode
}

user.methods.compare= function(password, confirmation_password) {
     
    return  bcryptjs.compare(password, confirmation_password)
}

const users = mongoose.model('users', user)

module.exports = users
  