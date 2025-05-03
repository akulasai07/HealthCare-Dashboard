// PatientDashboard.jsx
// This component renders the full layout for a patient's dashboard view,
// including patient selection list, health vitals, diagnostic history, lab results, and profile info.

import React from 'react';
import BloodPressureChart from './BloodPressureChart';

const PatientDashboard = ({ patient, patients, onSelect }) => {
  // Use the first diagnosis entry (typically most recent) for vitals display
  const diagnosis = patient.diagnosis_history[0];

  return (
    <div className="dashboard-grid">
      {/* Left Sidebar: List of all patients */}
      <aside className="sidebar">
        <div className="sidebar-header">Patients</div>
        <ul className="patient-list">
          {patients.map(p => (
            <li
              key={p.name}
              className={p.name === patient.name ? 'selected' : ''}
              onClick={() => onSelect(p)} // Set selected patient on click
            >
              <div className="patient-entry">
                {/* Patient profile picture and info */}
                <img src={p.profile_picture} alt={p.name} className="patient-avatar" />
                <div>
                  {p.name}<br /><span>{p.gender}, {p.age}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Section: Charts, Vitals, Diagnostics, Lab Results */}
      <main className="main-content">
        <div className="header">Diagnosis History</div>

        {/* Blood Pressure Line Chart */}
        <div className="chart-card">
          <BloodPressureChart history={patient.diagnosis_history} />
        </div>

        {/* Vital signs section (Respiratory, Temperature, Heart Rate) */}
        <div className="vitals-grid">
          <div className="vital-box blue">
            <div className="label">🫁 Respiratory Rate</div>
            <img src="https://img.icons8.com/ios/50/lungs.png" alt="lungs" className="vital-icon" />
            <div className="value">{diagnosis.respiratory_rate.value} bpm</div>
            <div className="level">{diagnosis.respiratory_rate.levels}</div>
          </div>
          <div className="vital-box red">
            <div className="label">🌡️ Temperature</div>
            <img src="https://img.icons8.com/ios/50/thermometer.png" alt="temperature" className="vital-icon" />
            <div className="value">{diagnosis.temperature.value}°F</div>
            <div className="level">{diagnosis.temperature.levels}</div>
          </div>
          <div className="vital-box pink">
            <div className="label">❤️ Heart Rate</div>
            <img src="https://img.icons8.com/ios/50/heart-with-pulse.png" alt="heart rate" className="vital-icon" />
            <div className="value">{diagnosis.heart_rate.value} bpm</div>
            <div className="level">{diagnosis.heart_rate.levels}</div>
          </div>
        </div>

        {/* Diagnostic List Table */}
        <div className="diagnostic-section">
          <h3>🧾 Diagnostic List</h3>
          <div className="diagnostic-scroll">
            <table>
              <thead>
                <tr>
                  <th>Problem/Diagnosis</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patient.diagnostic_list.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lab Results List */}
        <div className="lab-section">
          <h3>🧪 Lab Results</h3>
          <div className="lab-scroll">
            <ul>
              {patient.lab_results.map((result, idx) => (
                <li key={idx}>
                  {result} <button className="download-btn">⬇</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Right Sidebar: Detailed patient profile */}
      <aside className="profile-section" style={{ textAlign: 'left' }}>
        <div className="profile-center">
          <img src={patient.profile_picture} alt={patient.name} className="profile-pic" />
        </div>
        <h2>{patient.name}</h2>
        <p><strong>🎂 Date Of Birth</strong><br />{patient.date_of_birth}</p>
        <p><strong>🚻 Gender</strong><br />{patient.gender}</p>
        <p><strong>📞 Contact Info</strong><br />{patient.phone_number}</p>
        <p><strong>🆘 Emergency Contacts</strong><br />{patient.emergency_contact}</p>
        <p><strong>🏥 Insurance Provider</strong><br />{patient.insurance_type}</p>
        <button className="info-btn">Show All Information</button>
      </aside>
    </div>
  );
};

export default PatientDashboard;
