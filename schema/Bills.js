const mongoose=require('mongoose')
const Bill = mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
      required: [true,'patient_id is required']
    }, 
    // "appointment_id": "ObjectId",
    issue_date: Date,
    due_date: Date,
    total_amount: Number,
    paid_amount: Number,
    status: String // e.g., "Paid", "Unpaid"
  }
  )

  Bill.pre(/^find/, function (next) {
    this.populate({ path: 'patient_id', select: 'first_name last_name' })
     next()
    })
const Bills = mongoose.model('Bills', Bill)

module.exports = Bills