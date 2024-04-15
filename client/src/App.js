import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NurseDashboard from './pages/NurseDashboard'
import AddVitalSigns from './pages/AddVitalSigns'
import PatientData from './pages/PatientData';
import OnePatient from './pages/OnePatient';
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import SymptomChecker from './pages/SymptomChecker';


// Use React Router to navigate between different pages
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/nurse' element={<NurseDashboard />} />
          <Route path='/addVitalSigns' element={<AddVitalSigns />} />
          <Route path='/patientData' element={<PatientData />} />
          <Route path='/symptomChecker' element={<SymptomChecker />} />
          <Route path='/patientData/:id' element={<OnePatient />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
