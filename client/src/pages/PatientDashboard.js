import { Link } from 'react-router-dom';

function PatientDashboard() {

    return (
        <div className="patientContainer">
            <div className="links">
                <Link to={"/patientHealthForm"} className="addBtn">Enter Vital Signs</Link>
            </div>
        </div>
    )
}

export default PatientDashboard;