const axios = require('axios');
const cors = require('cors');
const Airtable = require('airtable');

const corsHandler = cors();

module.exports = async (req, res) => {
    try {
        console.log('Inside the serverless function...');
        console.log('Request body:', req.body);

        corsHandler(req, res, async () => {
            let { uuid, event_content, event_type, event_page } = req.body;

            // Generate event time in ISO format
            const event_time = new Date().toISOString();
        
            // Initialize Airtable with your base ID and API key
            const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_EVENTS_BASE_ID);

            // Assuming event_content is already a JSON string as per the provided eventData structure
            // If not, you would need to JSON.stringify the event_content object here

            // Create a new record in the specified table
            await base(process.env.AIRTABLE_EVENTS_TABLE_ID).create([
                {
                    fields: {
                        uuid: uuid,
                        event_content: event_content, 
                        event_time: event_time,
                        event_type: event_type,
                        event_page: event_page
                    },
                },
            ]);

            res.status(200).json({ message: 'Record created successfully' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};