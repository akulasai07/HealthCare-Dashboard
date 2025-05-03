// This component is responsible for displaying the blood pressure chart along with a custom legend and dropdown for time range selection.

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BloodPressureChart = ({ history }) => {
  const [range, setRange] = useState(6); // Default time range is 6 months

  // Sort the diagnosis history chronologically
  const sortedHistory = [...history].sort((a, b) => {
    const aDate = new Date(`${a.year}-${a.month || '01'}`);
    const bDate = new Date(`${b.year}-${b.month || '01'}`);
    return aDate - bDate;
  });

  // Limit the number of months to the selected range
  const limitedHistory = sortedHistory.slice(-range);

  // Extract labels and data points from the limited history
  const labels = limitedHistory.map(h => `${h.month || ''} ${h.year}`);
  const systolicValues = limitedHistory.map(h => h.blood_pressure.systolic.value);
  const diastolicValues = limitedHistory.map(h => h.blood_pressure.diastolic.value);

  // Chart data definition
  const data = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: systolicValues,
        borderColor: '#a25ddc',
        backgroundColor: 'rgba(162, 93, 220, 0.1)',
        pointBackgroundColor: '#a25ddc',
      },
      {
        label: 'Diastolic',
        data: diastolicValues,
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        pointBackgroundColor: '#4a90e2',
      },
    ],
  };

  // Chart configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Disable default legend
      title: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      {/* Chart header with title and dropdown */}
      <div className="chart-header">
        <h3>Blood Pressure</h3>
        <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
          <option value={3}>Last 3 months</option>
          <option value={6}>Last 6 months</option>
          <option value={12}>Last 12 months</option>
          <option value={24}>Last 24 months</option>
          <option value={history.length}>All time</option>
        </select>
      </div>

      {/* Chart and custom legend layout */}
      <div className="chart-with-legend">
        <div className="chart-container">
          <Line options={options} data={data} />
        </div>

        {/* Custom vertical legend showing color-coded info */}
        <div className="chart-legend">
          <div>
            <span style={{ color: '#a25ddc', fontWeight: 'bold' }}>●</span> <strong>Systolic</strong><br />
            <small>160 – Higher than Average</small>
          </div>
          <div>
            <span style={{ color: '#4a90e2', fontWeight: 'bold' }}>●</span> <strong>Diastolic</strong><br />
            <small>78 – Lower than Average</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureChart;