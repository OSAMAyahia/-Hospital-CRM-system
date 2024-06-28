const jwt = require('jsonwebtoken')
const jwtoken = (users) => { return jwt.sign({ id: users._id }, process.env.SECRECT, { expiresIn: process.env.EX }) }

const send = (req,res, statusCode, person) => {
    
    if (req.path == '/login' || req.path == '/signup') {
        const jwt = jwtoken(person)
        res.cookie("jwt",jwt, { expires: new Date(Date.now() + 90 *24* 60 *60 *1000), httpOnly: true})
        res.status(statusCode).json({ status: "success", jwt })
    }
    else { res.status(statusCode).json({ status: "success" ,person })
};

}

module.exports =send