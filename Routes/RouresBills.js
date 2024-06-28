const express = require('express');
const protect = require('../Controller/ControllerUsers');
const router = express.Router();
const Bills=require('../Controller/Controller_Bills')
router.route('/').get(protect.protect,protect.restrictTo("admin"),Bills.getAllBills).post(protect.protect,protect.restrictTo("admin"),Bills.CreateBills)
router.route('/:Id').delete(protect.protect,protect.restrictTo("admin"),Bills.DeleteBills).patch(protect.protect,protect.restrictTo("admin"),Bills.UpdateBills).get(protect.protect,protect.restrictTo("admin","user"),Bills.getOneBills)
module.exports = router 
