const model = require('../schema/Patients')
const {newErorr,catchAsync} = require('../utlis/errorhandler')
const mongoose=require('mongoose')
const send=require('../utlis/cookie')


exports.getAllPatient = catchAsync(async (req, res,next) => {
    const patient = await model.find({})

    if (patient.length === 0) {
        return next(new newErorr(401," doesnt exist any patient")); 
    }
    send(req,res,200,patient);

})

exports.CreatePatient = catchAsync(async (req, res,next) => {
  
    
    const patient = await model.create(req.body)
    send(req,res,200,patient)

})

exports.getOnePatient = catchAsync(async (req, res,next) => {
  
    const id = req.params.Id;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return next(new newErorr(401,"invalid object id"));

    // }
    const patient = await model.findById(id)
    if (!patient) {
        return next(new newErorr(401,"not founded patient")); 

    }
    send(req,res,200,patient)
})

exports.DeletePatient = catchAsync(async (req, res,next) => {
  
    const id = req.params.Id;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return next(new newErorr(401,"invalid object id"));

    // }
    await model.findByIdAndDelete(id)
        res.status(200).json({ status: "success", Data: null })
})
exports.UpdatePatient = catchAsync(async (req, res,next) => {
  
    const id = req.params.Id;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return next(new newErorr(401,"invalid object id"));

    // }
    const patient = await model.findOneAndUpdate({_id:id},req.body,{new:true});
    send(req,res,200,patient)
})