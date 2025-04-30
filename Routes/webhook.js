const express = require("express");
const { downloadFile } = require("../functions/downloadfile");
const { scanFile } = require("../functions/scanfile");
const { deleteFile } = require("../functions/deleteFile");

const router = express.Router();


router.post("/webhook", async (req, res) => {
    try {
      
      const attachment = req.body.issue.fields.attachment[0];
      
      if (!attachment) {
        return res.status(400).send("No attachment found.");
      }
  
      const filePath = await downloadFile(attachment);
  
      const isMalicious = await scanFile(filePath);
  
      if (isMalicious) {
        await deleteFile(attachment.id);
        console.log("file deleted from Jira.");
      } else {
        console.log("File is clean.");
      }
  
      res.status(200).send("Processed successfully.");
    } catch (error) {
      console.error("Webhook Error: ", error.message);
      res.status(500).send("Something went wrong.");
    }
  });


  module.exports = router;