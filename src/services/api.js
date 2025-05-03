// api.js
// This module handles fetching patient data securely from the Coalition Technologies API using Basic Authentication.

import axios from 'axios';

// Base URL for the patient data API
const BASE_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

// Generate the Authorization header using Basic Auth
// Encodes "coalition:skills-test" to base64 and prepends it with "Basic"
const getAuthHeader = () => {
  const token = btoa('coalition:skills-test');
  return `Basic ${token}`;
};

// Fetch patient data from the API
export const getPatients = async () => {
  try {
    // Make GET request with Authorization header
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    // Return parsed patient data
    return response.data;
  } catch (error) {
    // Log any error to console and return an empty array as fallback
    console.error('API Error:', error);
    return [];
  }
};
