import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PATIENTDATA } from '../graphql/mutations';

const PatientHealthForm = () => {
    const [patientId, setPatientId] = useState('');
    const [fullName, setFullName] = useState('');
    const [date, setDate] = useState('');
    const [bodyTemp, setBodyTemp] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [warning, setWarning] = useState('');

    const [addHealthData] = useMutation(ADD_PATIENTDATA);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addHealthData({
                variables: {
                    patientId: patientId,
                    fullName: fullName,
                    date: date,
                    bodyTemp: bodyTemp,
                    heartRate: heartRate,
                    bloodPressure: bloodPressure,
                    respiratoryRate: respiratoryRate
                }
            });
            setWarning('Health data has been entered');
            setPatientId('');
            setFullName('');
            setDate('');
            setBodyTemp('');
            setHeartRate('');
            setBloodPressure('');
            setRespiratoryRate('');
            setTimeout(() => {
                setWarning('');
            }, 2000);
        } catch (error) {
            console.error('Error submitting health data:', error);
        }
    };

    return (
        <div className='container'>
            <div className="form-signin w-50 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Daily Health Information</h1>
                    <h1 className="h3 mb-3 fw-normal" style={{ color: "red" }}>{warning}</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                        <label>Patient ID</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        <label>Full Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        <label>Date</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Body Temperature" value={bodyTemp} onChange={(e) => setBodyTemp(e.target.value)} required />
                        <label>Body Temperature (°C)</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Heart Rate" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} required />
                        <label>Heart Rate (BPM)</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Blood Pressure" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
                        <label>Blood Pressure (mm/Hg)</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Respiratory Rate" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} required />
                        <label>Respiratory Rate (BPM)</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PatientHealthForm;
