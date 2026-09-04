const axios = require("axios");
const HttpError = require("../models/http-error");
//const API_KEY = "";
async function getCoordsForAddress(address) {
  //console.log("API KEY:",API_KEY);
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search`,
    {
      params:{
        q:address,
        format:"json",
        limit:1
      },
      headers:{
        "User-Agent":"MY_MERN_PROJECT"
      }
    }
  );
  const data = response.data;
  console.log(data);
  if(!data || data.length === 0 ){
    const error = new HttpError('Could not find location for the specified address.',422);
    throw error;
  }
  const coordinates = {
    lat:parseFloat(data[0].lat),
    lng:parseFloat(data[0].lon)
  };
  return coordinates;
}
module.exports = getCoordsForAddress;
