import { Link, useParams } from 'react-router-dom'
import { GET_RECORDS_BY_PATIENT_ID } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import '../App.css'

/*
*Author: Zhenqiao Wang
*/

// retrieve one patient's vital information and display it in the table
function OnePatient(){

    //use params to get patient id from url
    const {id} = useParams()

    //get all records by patient id
    const { data } = useQuery(GET_RECORDS_BY_PATIENT_ID, {variables: {patientId: id}});

    return(
        <div className='vitalInfo'>
            <Link to={"/patientData"} className="backBtn">Back to All Patient Information</Link>
             <div className="vitalInfoTable">
                <h1>Patient Information Table</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Full Name</th>
                            <th>Date</th>
                            <th>Body Temperature</th>
                            <th>Heart Rate</th>
                            <th>Blood Pressure</th>
                            <th>Respiratory Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.onePatientsData.map((d, index) => {
                                return(
                                    <tr key={d._id}>
                                        <td>{d.patientId}</td>
                                        <td>{d.fullName}</td>
                                        <td>{d.date}</td>
                                        <td>{d.bodyTemp}</td>
                                        <td>{d.heartRate}</td>
                                        <td>{d.bloodPressure}</td>
                                        <td>{d.respiratoryRate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OnePatient
