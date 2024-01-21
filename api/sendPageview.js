const axios = require('axios');
const cors = require('cors');

// CORS and helper function similar to submitForm.js

module.exports = async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      // Replace with your Airtable webhook URL
      const response = await axios.post('https://hooks.airtable.com/workflows/v1/genericWebhook/apppolunZpqRjokmM/wflSvlbC4gCgQQwNI/wtrMjosf8w3JjvADn', req.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
