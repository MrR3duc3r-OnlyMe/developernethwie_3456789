const axios = require("axios");
async function page(token, headers){
  const nigga = [token];
  try {
  const response = await axios.get(`https://graph.facebook.com/v18.0/me/accounts`, { headers })
  .catch(error=>{
    console.error(error);
    return nigga;
  });
  if (!response) {
    return nigga;
  }
  for (var e of response.data.data) {
    nigga.push(token);
  }
  return nigga;
  } catch(e){
  return nigga;
  }
  }
  module.exports = {
    page
  };