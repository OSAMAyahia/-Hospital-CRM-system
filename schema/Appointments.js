const mongoose=require('mongoose')
const Appointments = mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
      required: [true,'patient_id is required']
    }, 
  doctor_id: {
    type: mongoose.Schema.ObjectId, ref: 'Doctor',
    required: [true,'doctor_id is required']
    }, 
    appointment_date: Date,
    appointment_time: String,
    status: String, // e.g., "Scheduled", "Completed", "Cancelled"
    notes: String
  }
  )

Appointments.pre(/^find/, function (next) {
  this.populate({ path: 'patient_id', select: 'first_name last_name' }).populate({
    path: 'doctor_id', select: 'first_name last_name'})
   next()
  })
const Appointment = mongoose.model('Appointments', Appointments)

module.exports = Appointment