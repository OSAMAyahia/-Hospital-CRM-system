class newErorr extends Error{
    constructor(statusCode,message) {
        super(message)
        this.statusCode=statusCode
        this.status =`${statusCode}`.startsWith(4)? "Fail" : "Erorr" 
        this.operational=true
    }
}




const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}
module.exports = {newErorr,catchAsync}



