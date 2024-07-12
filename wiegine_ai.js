const axios = require("axios");
async function cfai(model,system,user,image){
  if (!model) {
    return res.json({
      msg: "An AI Model is required!!!",
      status: false
    });
  }
  if (!user) {
    return res.json({
      msg: "param 'user' is required!!!",
      status: false
    });
  }
  const data = system ? {
    "messages": [
      { "role": "system", "content": system },
      { "role": "user", "content": user }
      ]
  } : {"prompt": user};
  const accid = "aeb6994d3b0046916b38c8840634af2b";
  const token = "h2BM9DzjQJoYmQHeDGLDpDUzVMIg4bO2WBtIQtHe";
  const ako = `https://api.cloudflare.com/client/v4/accounts/${accid}/ai/run/${model}`
  const headers = {
    "Authorization": "Bearer " + token
  };
  let ax = null;
  if (!image){
  ax = await axios.post(ako, data, { headers });
  } else {
  ax = await axios.post(ako, data, {
            responseType: "arraybuffer",
            headers
        });
  }
  if (ax.data && image){
    return ax.data;
  }
  if (ax.data.result.response && !image) {
    return {
      msg: ax.data.result.response,
      status: true
    };
  } else {
    return {
      msg: "An error occured.",
      status: false
    };
  }
}

module.exports = {
  cfai
};