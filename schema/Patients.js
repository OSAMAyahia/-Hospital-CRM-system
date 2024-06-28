const mongoose=require('mongoose')
const Patients = mongoose.Schema({
    first_name: {
        type: String, required: true,
    },
last_name: {
    type: String, required: true,
    },
    date_of_birth: Date,
    gender: String,
    contact_info: {
        phone: Number,
        email: String,
        address: String
    }
    ,
    medical_history: [
        {
          condition :String,
          diagnosis_Date: Date,
          notes: String
        }]



})


const Patient = mongoose.model('Patient', Patients)

module.exports = Patient