const express = require('express');
const protect = require('../Controller/ControllerUsers');
const router = express.Router();
const Docor=require('../Controller/Controller_Doctor')
router.route('/').get(protect.protect,protect.restrictTo('doctor','admin'),Docor.getAllDocor).post(protect.protect,protect.restrictTo('doctor'),Docor.CreateDocor)
router.route('/:Id').delete(protect.protect,protect.restrictTo('admin'),Docor.DeleteDocor).patch(protect.protect,protect.restrictTo('doctor','admin'),Docor.UpdateDocor).get(protect.protect,protect.restrictTo('doctor','admin'),Docor.getOneDocor)
module.exports = router 
