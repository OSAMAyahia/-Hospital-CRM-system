const express = require('express');
const protect = require('../Controller/ControllerUsers');
const router = express.Router();
const MedicalRecord=require('../Controller/Controller_MedicalRecord')
router.route('/').get(protect.protect,protect.restrictTo("doctor","admin"),MedicalRecord.getAllMedicalRecord).post(protect.protect,protect.restrictTo("doctor","admin"),MedicalRecord.CreateMedicalRecord)
router.route('/:Id').delete(MedicalRecord.DeleteMedicalRecord).patch(protect.protect,protect.restrictTo("doctor","admin"),MedicalRecord.UpdateMedicalRecord).get(protect.protect,MedicalRecord.getOneMedicalRecord)
module.exports = router 
