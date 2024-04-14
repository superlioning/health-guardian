import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import PatientHealthForm from './pages/PatientHealthForm';


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
          <Route path="/patientHealthForm" element={<PatientHealthForm />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
