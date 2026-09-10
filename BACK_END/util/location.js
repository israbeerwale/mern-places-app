const axios = require("axios");
const HttpError = require("../models/http-error");
//const API_KEY = "";
async function getCoordsForAddress(address) {
  //console.log("API KEY:",API_KEY);
  const response = await axios.get(
    `https://api.opencagedata.com/geocoding/v1/json`,
    {
      params:{
        q:address,
        key: process.env.OPENCAGE_API_KEY,
        limit:1,
      },
    }
  );
  const data = response.data;
  if(!data || !data.results || data.results.length === 0 ){
    const error = new HttpError('Could not find location for the specified address.',422);
    throw error;
  }
  const coordinates = {
    lat: data.results[0].geometry.lat,
    lng: data.results[0].geometry.lng
  };
  return coordinates;
}
module.exports = getCoordsForAddress;
