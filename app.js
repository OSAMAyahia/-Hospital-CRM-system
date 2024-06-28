const express = require('express')
const env = require('dotenv')
const mongoose=require('mongoose')
env.config({ path: '.env' })
const Patient=require('./Routes/RouresPatient')
const Docor=require('./Routes/RouresDocor')
const MedicalRecord=require('./Routes/RouresMedicalRecord')
const Appointments=require('./Routes/RouresAppointments')
const Bills=require('./Routes/RouresBills')
const User=require('./Routes/RouresUser')
const morgan=require('morgan')
const {newErorr} = require('./utlis/errorhandler')
const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use('/api/v1/Patient',Patient) 
app.use('/api/v1/Docor',Docor) 
app.use('/api/v1/MedicalRecord',MedicalRecord) 
app.use('/api/v1/Appointments',Appointments) 
app.use('/api/v1/Bills',Bills) 
app.use('/api/v1/User',User) 
mongoose.connect(process.env.uri).then(() => { console.log('connect to db') }).catch(err => { console.log(err) });

//global middleware
app.all('*', (req, res, next) => {
    return next (new newErorr(400,`the URL : ${req.originalUrl} CAN NOT be FOUND`));
})
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status =  err.status  ||"erorr"
    res.status(err.statusCode).json({ status: err.status ,message:err.message,err:err.stack,err:err})

})
app.listen(process.env.port, () => { console.log(`listening on port${process.env.port}`) })

