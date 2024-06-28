const nodemailer = require('nodemailer')

const email = async (options) =>
{
    const Transport = nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: process.env.PORTs, secure: true, auth: { user: process.env.EMAIL_USER, pass: process.env.PASS_USER } })
    
const mailobj = {
    from: 'OSAMA_TOUR_COMPANY <osama@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
}

    await Transport.sendMail(mailobj)
}
module.exports =email