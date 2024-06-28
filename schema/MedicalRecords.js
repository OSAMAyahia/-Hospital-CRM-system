const mongoose=require('mongoose')
const MedicalRecord = mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
      required: [true,"the patient_id is required"]
    }, 
    doctor_id :{ type: mongoose.Schema.ObjectId,ref:'Doctor'}, 
    record_date: Date,
    details: String,
    prescriptions: [
      {
        medicine_name: String,
        dosage: String,
        duration: String
      }
    ]
  }
  )

  MedicalRecord.pre(/^find/, function (next) {
    this.populate({ path: 'patient_id', select: 'first_name last_name' })
     next()
    })
const MedicalRecords = mongoose.model('MedicalRecords', MedicalRecord)

module.exports = MedicalRecords