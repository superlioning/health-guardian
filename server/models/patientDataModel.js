const mongoose = require('mongoose')

/*
*   Define a mongoose schema for patient data which includes
*   patientId, full name, date of visit, body temperature, 
*   heart rate, blood pressure, and respiratory rate
*/

// patient data schema
const PatientDataSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: [true, 'Please enter the ID number of the patient.']
    },
    fullName: {
        type: String,
        required: [true, 'Please enter the full name of the patient.']
    },
    date: {
        type: String,
        required: [true, 'Please enter the date of visit.']
    },
    bodyTemp: {
        type: String,
        required: [true, 'Please enter the body temperature.']
    },
    heartRate: {
        type: String,
        required: [true, 'Please enter the heart rate.']
    },
    bloodPressure: {
        type: String,
        required: [true, 'Please enter the blood pressure.']
    },
    respiratoryRate: {
        type: String,
        required: [true, 'Please enter the respiratory rate.']
    }
})

//export patient data model

const PatientData = mongoose.model('PatientData', PatientDataSchema)
module.exports = PatientData