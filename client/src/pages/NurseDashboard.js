import { Link } from 'react-router-dom';

function NurseDashboard() {

    return (
        <div className="nurseContainer">
            <div className="links">
                <Link to={"/addVitalSigns"} className="addBtn">Enter Vital Signs</Link>
                <Link to={"/patientData"} className="accessBtn">Access Patients Information</Link>
            </div>
        </div>
    )
}

export default NurseDashboard;