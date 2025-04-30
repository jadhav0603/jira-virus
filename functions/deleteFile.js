const axios = require("axios");

const deleteFile = async (attachmentId) => {
  const auth = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString("base64");

  await axios.delete(`${process.env.JIRA_BASE_URL}/rest/api/3/attachment/${attachmentId}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
};

module.exports = { deleteFile };