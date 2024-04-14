const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: [true, 'Patient ID is required']
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    bodyTemp: {
        type: String,
        required: [true, 'Body temperature is required']
    },
    heartRate: {
        type: String,
        required: [true, 'Heart rate is required']
    },
    bloodPressure: {
        type: String,
        required: [true, 'Blood pressure is required']
    },
    respiratoryRate: {
        type: String,
        required: [true, 'Respiratory rate is required']
    }
});

// Define and export the patient data model
const PatientData = mongoose.model('patientdatas', patientDataSchema);
module.exports = PatientData;
