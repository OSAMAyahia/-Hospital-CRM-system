const model = require('../schema/Appointments')
const {newErorr,catchAsync} = require('../utlis/errorhandler')
const mongoose=require('mongoose')
const send=require('../utlis/cookie')
exports.getAllAppointments =catchAsync (async (req, res,next) => { 
    const Appointments = await model.find({})
    if (Appointments.length === 0) {
        return next(new newErorr(401," doesnt exist any Appointments")); 
    }
    send(req,res,200,Appointments)
})
exports.CreateAppointments = catchAsync(async (req, res,next) => {
    const Appointments = await model.create(req.body)
    send(req,res,200,Appointments)
})
exports.getOneAppointments = catchAsync(async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id")); }
    const Appointments = await model.findById(id)
    if (!Appointments) {
        return next(new newErorr(401,"not founded Appointments"));  }
    send(req,res,200,Appointments)
})

exports.DeleteAppointments = catchAsync(async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));
    }
    await model.findByIdAndDelete(id)
        res.status(200).json({ status: "success", Data: null })
})

exports.UpdateAppointments =catchAsync (async (req, res,next) => {
    const id = req.params.Id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new newErorr(401,"invalid object id"));

    }
    const Appointments = await model.findOneAndUpdate({_id:id},req.body,{new:true});
    send(req,res,200,Appointments)
})