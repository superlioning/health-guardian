import React, { useState } from "react"
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom"
import { GET_RECORDS_BY_PATIENT_ID, GET_RECORDS } from "../graphql/queries"

/*
*Author: Zhenqiao Wang
*/

// retrieve all patients vital information and display it in the table
function PatientData() {

    const[pId, setPatientId] = useState('')
    const[searchResult, setSearchResult] = useState(null)

    // get all data records
    const { data } = useQuery(GET_RECORDS);

    //handle search input changes
    const onChangePID = async (e) => {
        setPatientId(e.target.value)
    }

    // get data records for 1 patient via their patient id
    const {data: result, refetch: refetchData} = useQuery(GET_RECORDS_BY_PATIENT_ID, {variables: {patientId: pId}});

    //find patient info and set search result
    const findByID = async () => {
        try {
            //get all records by patient id
            await refetchData()
            console.log(result)
            console.log(result.onePatientsData)

            setSearchResult(result.onePatientsData)
            
        } catch (error) {console.error('Error finding patient data by id', error)}
    }

    //clear search
    const clearSearch = async () => {
        console.log(searchResult._id)
        setPatientId('')
        setSearchResult(null)
    }

    //patient information table
    return(
        <div className='vitalInfo'>
            <div className="actions">
            <input type="text" placeholder="Search by ID" value={pId} onChange={onChangePID}></input>
                <button type="button" onClick={findByID}>Search</button>
                <button className="clearBtn" type="button" onClick={clearSearch}>Clear Search</button>
            </div>
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
                            <th>View All Per Patient</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!searchResult ? (
                             data?.allDataRecords.map((d, index) => {
                                return(
                                    <tr key={d._id}>
                                        <td>{d.patientId}</td>
                                        <td>{d.fullName}</td>
                                        <td>{d.date}</td>
                                        <td>{d.bodyTemp}</td>
                                        <td>{d.heartRate}</td>
                                        <td>{d.bloodPressure}</td>
                                        <td>{d.respiratoryRate}</td>
                                        <td className="actionBtn">
                                            <Link to={`/patientData/${d.patientId}`}>View All of this Patient's Records</Link> <br></br><br></br>

                                        </td>
                                    </tr>
                                )
                            })
                        ) : ( 
                            searchResult.map((s, index) => {
                                return (
                                    <tr key={s._id}>
                                    <td>{s.patientId}</td>
                                    <td>{s.fullName}</td>
                                    <td>{s.date}</td>
                                    <td>{s.bodyTemp}</td>
                                    <td>{s.heartRate}</td>
                                    <td>{s.bloodPressure}</td>
                                    <td>{s.respiratoryRate}</td>
                                    <td className="actionBtn">
                                            <Link to={`/patientData/${s.patientId}`}>View All of this Patient's Records</Link> <br></br><br></br>

                                        </td>
                                </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PatientData
