// App.js
// Root component of the application. It fetches patient data and renders the top-level layout and navigation.

import React, { useEffect, useState } from 'react';
import PatientDashboard from './components/PatientDashboard';
import { getPatients } from './services/api';

function App() {
  // State to store all patient records
  const [patients, setPatients] = useState([]);

  // State to track which patient is currently selected
  const [selected, setSelected] = useState(null);

  // useEffect runs once when the component mounts
  // It fetches patient data from the API and sets the default selected patient
  useEffect(() => {
    getPatients().then(data => {
      setPatients(data); // Save the entire list of patients
      setSelected(data.find(p => p.name === 'Jessica Taylor')); // Select Jessica Taylor by default
    });
  }, []);

  return (
    <div className="app-wrapper">
      {/* Top navigation bar with logo, navigation links, and user info */}
      <header className="top-nav">
        <div className="logo">Tech.Care</div>
        <nav>
          <ul>
            <li className="active">Patients</li>
            <li>Schedule</li>
            <li>Message</li>
            <li>Transactions</li>
          </ul>
        </nav>
        <div className="user-info">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Dr. Jose Simmons" />
          <div>
            <strong>Dr. Jose Simmons</strong>
            <span>General Practitioner</span>
          </div>
        </div>
      </header>

      {/* Render the main patient dashboard only when a patient is selected */}
      {selected && (
        <PatientDashboard
          patient={selected}
          patients={patients}
          onSelect={setSelected}
        />
      )}
    </div>
  );
}

export default App;
