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
            const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_APP_ID);

                // Create a new record in the specified table
                await base(process.env.AIRTABLE_EVENT_LOG_TABLE_ID).create([
                    {
                        fields: {
                            uuid: uuidArray, // Ensure this is an array of record IDs
                            event_content,
                            event_time,
                            event_type: eventTypeArray,
                            event_page
                        },
                    },
                ]);
        
                res.status(200).json({ message: 'Record created successfully' });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
