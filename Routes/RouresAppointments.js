const express = require('express');
const protrct = require('../Controller/ControllerUsers');
const Appointments=require('../Controller/Controller_Appointments')
const router = express.Router();
router.route('/').get(protrct.protect,protrct.restrictTo("admin"),Appointments.getAllAppointments).post(protrct.protect,protrct.restrictTo("user","admin"),Appointments.CreateAppointments)
router.route('/:Id').delete(protrct.protect,protrct.restrictTo("admin"),Appointments.DeleteAppointments).patch(protrct.protect,protrct.restrictTo("admin"),Appointments.UpdateAppointments).get(protrct.protect,Appointments.getOneAppointments)
module.exports = router 
