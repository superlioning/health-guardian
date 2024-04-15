import { useMutation } from "@apollo/client"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { ADD_PATIENTDATA } from "../graphql/mutations"

/*
*Author: Zhenqiao Wang
*/

//add patient vital signs
function AddVitalSigns() {

    //state variables to manage form input
    const [patientId, setPatientId] = useState('')
    const [fullName, setFullName] = useState('')
    const [date, setDate] = useState('')
    const [bodyTemp, setBodyTemp] = useState('')
    const [heartRate, setHeartRate] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    const [respiratoryRate, setRespiratoryRate] = useState('')
    
    const navigate = useNavigate()

    // mutation hook to add new patient data
    const[addPatientData] = useMutation(ADD_PATIENTDATA)

    // handle user input
    const handleInput = async (e) => {
        e.preventDefault()
        try{
            await addPatientData({variables: {patientId: patientId, fullName: fullName, date: date, bodyTemp: bodyTemp, heartRate: heartRate, bloodPressure: bloodPressure, respiratoryRate: respiratoryRate}})
           
            setPatientId('')
            setFullName('')
            setDate('')
            setBodyTemp('')
            setHeartRate('')
            setBloodPressure('')
            setRespiratoryRate('')

            navigate('/nurse')
        } catch (error){
            console.error('Error adding new patient data', error)
        }
    }

    return(
        <div className="container">
        <Link className="btn btn-warning w-100 py-2" to="/nurse">Back to Dashboard</Link>
            <div className="form-signin w-50 m-auto">
                <form onSubmit={handleInput}>
                    <h1 className="h3 mb-3 fw-normal">Add New Vital Signs</h1>
                    <div className="form-floating">
                        <input type="text" id="patientId" className="form-control" placeholder="patientId" value={patientId} onChange={e => setPatientId(e.target.value)} required />
                        <label htmlFor="patientId">Patient ID</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="fullName" className="form-control" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                        <label htmlFor="fullName">Full Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="date" className="form-control" placeholder="date" value={date} onChange={e => setDate(e.target.value)} required />
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="bodyTemp" className="form-control" placeholder="Body Temperature" value={bodyTemp} onChange={e => setBodyTemp(e.target.value)} required />
                        <label htmlFor="bodyTemp">Body Temperature</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="heartRate" className="form-control" placeholder="Heart Rate" value={heartRate} onChange={e => setHeartRate(e.target.value)} required />
                        <label htmlFor="heartRate">Heart Rate</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="bloodPressure" className="form-control" placeholder="Blood Pressure" value={bloodPressure} onChange={e => setBloodPressure(e.target.value)} required />
                        <label htmlFor="bloodPressure">Blood Pressure</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="respiratoryRate" className="form-control" placeholder="Respiratory Rate" value={respiratoryRate} onChange={e => setRespiratoryRate(e.target.value)} required />
                        <label htmlFor="respiratoryRate">Respiratory Rate</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Add Patient's Vital Information</button>
                    <button className="btn btn-secondary w-100 py-2" type="reset" 
                        onClick={() => { setPatientId('')
                            setFullName('')
                            setDate('')
                            setBodyTemp('')
                            setHeartRate('')
                            setBloodPressure('')
                            setRespiratoryRate('') }}>Reset</button>
                </form>
            </div>
        </div>
    )
}

export default AddVitalSigns
