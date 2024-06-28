const model = require('../schema/Doctors')
const {newErorr,catchAsync} = require('../utlis/errorhandler')
const mongoose=require('mongoose')
const send=require('../utlis/cookie')
exports.getAllDocor =catchAsync( async (req, res,next) => {
    const Docor = await model.find({})
    if (Docor.length === 0) {
        return next(new newErorr(401," doesnt exist any Docor")); }send(req,res,200,Docor)
})

exports.CreateDocor = catchAsync(async (req, res,next) => {
    const Docor = await model.create(req.body)
    send(req,res,200,Docor)
})

exports.getOneDocor = catchAsync(async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));
    }
    const Docor = await model.findById(id)
    if (!Docor) {
        return next(new newErorr(401,"not founded Docor")); 
    }
    send(req,res,200,Docor)
})
exports.DeleteDocor = catchAsync(async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));
    }
    await model.findByIdAndDelete(id)
        res.status(200).json({ status: "success", Data: null })
})

exports.UpdateDocor = catchAsync(async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));}
    const Docor = await model.findOneAndUpdate({_id:id},req.body,{new:true});
    send(req,res,200,Docor)
})