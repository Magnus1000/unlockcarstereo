const axios = require('axios');
const cors = require('cors');

// Initializing CORS middleware
const cors = Cors({
  methods: ['POST', 'HEAD'],
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

module.exports = async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      // Replace with your Make webhook URL
      const response = await axios.post('https://hook.us1.make.com/a3rwykfhisakdl9m2p91neo1wq8od673', req.body, {
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
