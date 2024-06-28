const model = require('../schema/MedicalRecords')
const {newErorr,catchAsync} = require('../utlis/errorhandler')
const mongoose=require('mongoose')
const send=require('../utlis/cookie')


exports.getAllMedicalRecord = catchAsync(async(req, res,next) => {
    const MedicalRecord = await model.find({})
    if (MedicalRecord.length === 0) {
        return next(new newErorr(401," doesnt exist any MedicalRecord")); 
    }
    send(req,res,200,MedicalRecord)
})

exports.CreateMedicalRecord =catchAsync (async(req, res,next) => {
    const MedicalRecord = await model.create(req.body)
    send(req,res,200,MedicalRecord)
})

exports.getOneMedicalRecord = catchAsync(async(req, res,next) => {

    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));
    }
    const MedicalRecord = await model.findById(id)
    if (!MedicalRecord) {
        return next(new newErorr(401,"not founded MedicalRecord")); 
    }
    send(req,res,200,MedicalRecord)
})

exports.DeleteMedicalRecord =  catchAsync(async(req, res,next) => {
 
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));
    }
    await model.findByIdAndDelete(id)
        res.status(200).json({ status: "success", Data: null })
})
exports.UpdateMedicalRecord = catchAsync(async(req, res,next) => {
 
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));

    }
    const MedicalRecord = await model.findOneAndUpdate({_id:id},req.body,{new:true});
    send(req,res,200,MedicalRecord)
})