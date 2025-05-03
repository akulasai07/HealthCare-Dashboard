import React from 'react';
import '../styles.css';
import BloodPressureChart from './BloodPressureChart';

const PatientDashboard = ({ patient, patients }) => {
  return (
    <div className="dashboard-grid">
      
      {/* Sidebar: Displays the list of all patients with profile image and info */}
      <aside className="sidebar">
        <div className="sidebar-header">
          Patients <span className="search-icon">🔍</span>
        </div>
        <ul className="patient-list">
          {patients.map((p, index) => (
            <li key={index} className={p.name === patient.name ? 'selected' : ''}>
              <div className="patient-entry">
                <img src={p.profile_picture} alt={p.name} className="patient-avatar" />
                <div>
                  {p.name}<br />
                  <span>{p.gender}, {p.age}</span>
                </div>
                <span className="patient-dots">⋯</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Section: Contains chart, vitals, and diagnostic list */}
      <main className="main-content">
        <div className="header">Diagnosis History</div>

        {/* Chart showing systolic & diastolic blood pressure trends */}
        <BloodPressureChart history={patient.diagnosis_history} />

        {/* Vitals Cards: Display key vital stats */}
        <div className="vitals-grid">
          <div className="vital-box blue">
            <div className="label">🫁 Respiratory Rate</div>
            <div className="value">{patient.diagnosis_history.at(-1).respiratory_rate.value} bpm</div>
            <div className="level">{patient.diagnosis_history.at(-1).respiratory_rate.levels}</div>
          </div>
          <div className="vital-box red">
            <div className="label">🌡 Temperature</div>
            <div className="value">{patient.diagnosis_history.at(-1).temperature.value}°F</div>
            <div className="level">{patient.diagnosis_history.at(-1).temperature.levels}</div>
          </div>
          <div className="vital-box pink">
            <div className="label">❤️ Heart Rate</div>
            <div className="value">{patient.diagnosis_history.at(-1).heart_rate.value} bpm</div>
            <div className="level">{patient.diagnosis_history.at(-1).heart_rate.levels}</div>
          </div>
        </div>

        {/* Diagnostic List Table: Display patient diagnosis history */}
        <div className="diagnostic-section">
          <h3>Diagnostic List</h3>
          <div className="diagnostic-scroll">
            <table>
              <thead>
                <tr><th>Problem/Diagnosis</th><th>Description</th><th>Status</th></tr>
              </thead>
              <tbody>
                {patient.diagnostic_list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Profile Sidebar: Personal info and lab results */}
      <aside className="profile-section">
        {/* Centered profile picture */}
        <div className="profile-center">
          <img src={patient.profile_picture} alt={patient.name} className="profile-pic" />
        </div>

        {/* Patient basic details */}
        <h2>{patient.name}</h2>
        <p><span role="img" aria-label="cake">🎂</span> <strong>Date Of Birth</strong><br />{new Date(patient.date_of_birth).toLocaleDateString()}</p>
        <p><span role="img" aria-label="gender">🧿</span> <strong>Gender</strong><br />{patient.gender}</p>
        <p><span role="img" aria-label="phone">📞</span> <strong>Contact Info</strong><br />{patient.phone_number}</p>
        <p><span role="img" aria-label="emergency">🆘</span> <strong>Emergency Contacts</strong><br />{patient.emergency_contact}</p>
        <p><span role="img" aria-label="insurance">🧾</span> <strong>Insurance Provider</strong><br />{patient.insurance_type}</p>

        {/* Button to show full info */}
        <button className="info-btn">Show All Information</button>

        {/* Lab Results Section: Scrollable list of tests */}
        <div className="lab-section">
          <h3>Lab Results</h3>
          <div className="lab-scroll">
            <ul>
              {patient.lab_results.map((item, index) => (
                <li key={index}>
                  {item} <button className="download-btn">⬇</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PatientDashboard;
