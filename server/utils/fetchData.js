// server/utils/fetchData.js
const axios = require('axios');

const fetchData = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

module.exports = fetchData;
