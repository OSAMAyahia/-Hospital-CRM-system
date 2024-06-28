const mongoose=require('mongoose')
const Doctors = mongoose.Schema({
    first_name: {
        type: String, required: true,
    },
    last_name:  {
        type: String, required: true,
    },

    contact_info: {
        phone: Number,
    specialty: String,
    email: String
    }
    , 
   schedule: [
    {
      day: String,
      start_time: String,
      end_time: String
    }
  ],



})


const Doctor = mongoose.model('Doctor', Doctors)

module.exports = Doctor