const axios = require("axios");
const fs = require("fs");

const scanFile = async (filePath) => {
  const fileData = fs.createReadStream(filePath);


  const { data } = await axios.post("https://www.virustotal.com/api/v3/files", fileData, {
    headers: {
      "x-apikey": process.env.VIRUSTOTAL_API_KEY,
      "Content-Type": "multipart/form-data",
    },
  });

  const analysisId = data.data.id;


  let result;
  while (true) {
    const response = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
      headers: {
        "x-apikey": process.env.VIRUSTOTAL_API_KEY,
      },
    });

    if (response.data.data.attributes.status === "completed") {
      result = response.data.data.attributes.stats;
      break;
    }

    await new Promise((r) => setTimeout(r, 3000)); 
  }

  return result.malicious > 0;
};

module.exports = { scanFile };
