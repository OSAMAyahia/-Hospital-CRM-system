const express = require('express');
const router = express.Router();
const patient=require('../Controller/Controller_Patient')
const user = require('../Controller/ControllerUsers')
const {gets,create,deletes,updates}=require('../utlis/validationRules/validationPatients')

router.route('/').get(patient.getAllPatient).post(create,patient.CreatePatient)
router.route('/:Id').delete(deletes,user.protect, user.restrictTo('admin'), patient.DeletePatient).patch(updates,user.protect, user.restrictTo('admin'),patient.UpdatePatient) .get( gets, patient.getOnePatient);

module.exports = router
