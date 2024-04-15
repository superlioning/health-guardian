import { Link } from 'react-router-dom';

/*
*Author: Zhenqiao Wang
*/

//nurse dashboard to access add vital signs page and patient data tables
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
