const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadFile = async (attachment) => {
    const filePath = path.join(__dirname, 'downloads', attachment.filename);
    const fileName = attachment.filename;
    const fileUrl = attachment.content;


    const headers = {
        'Authorization': `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString('base64')}`,
        'Accept': 'application/json',
    };

    try {
        const response = await axios.get(fileUrl, {
            headers: headers,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => resolve(filePath));
            writer.on("error", reject);
        });

    } catch (error) {
        console.error('Error downloading file:', error.message);
        throw new Error('File download failed');
    }

}