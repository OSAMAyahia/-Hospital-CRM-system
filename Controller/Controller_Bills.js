const model = require('../schema/Bills')
const {newErorr,catchAsync} = require('../utlis/errorhandler')
const mongoose=require('mongoose')
const send=require('../utlis/cookie')

exports.getAllBills = catchAsync(async (req, res,next) => {
    const Bills = await model.find({})
    if (Bills.length === 0) {
        return next(new newErorr(401," doesnt exist any Bills"));   }send(req,res,200,Bills)}
)

exports.CreateBills = catchAsync(async (req, res,next) => {
   
    const Bills = await model.create(req.body)
    send(req,res,200,Bills)})

exports.getOneBills = catchAsync(async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));
    }
    const Bills = await model.findById(id)
    if (!Bills) {
        return next(new newErorr(401,"not founded Bills"));   } send(req,res,200,Bills)
})

exports.DeleteBills = catchAsync(async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));
    }
    await model.findByIdAndDelete(id)
    res.status(200).json({ status: "success", Data: null })
})
        
exports.UpdateBills =catchAsync( async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));}
    const Bills = await model.findOneAndUpdate({_id:id},req.body,{new:true});
    send(req,res,200,Bills)
})