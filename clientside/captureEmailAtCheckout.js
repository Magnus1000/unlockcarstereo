document.addEventListener('DOMContentLoaded', function() {
    const emailField = document.getElementById('wf-ecom-email');
    
    if (!emailField) {
        return;
    }

    emailField.addEventListener('change', function(event) {

        // Attempt to retrieve the uuid from cookies
        let uuid = Cookies.get('uuid');

        // If uuid doesn't exist, generate a new one and store it in cookies
        if (!uuid) {
            uuid = generateUUID();
            Cookies.set('uuid', uuid, { expires: 365 }); // Store uuid in cookies with a 1-year expiration
        }

        const emailInput = event.target.value;

        if (!emailInput.includes('@')) {
            console.error('Invalid email address:', emailInput);
            return; // Exit the function if the email is not valid
        }

        const serverlessFunctionUrl = 'https://unlockcarstereo-magnus1000team.vercel.app/api/createUserEvent.js';

        // Generate event time in ISO format
        const event_time = new Date().toISOString();

        // Add the URL to the event data
        const event_page = '/checkout'; // Assuming 'url' should be the current page URL
        console.log('Event page:', event_page);

        // Retrieve serial info from sessionStorage
        const numbers = JSON.parse(sessionStorage.getItem('numbers'));

        // Check if numbers is null or undefined
        if (!numbers) {
            // Handle the case where numbers is null or undefined
        } else {
            // Proceed with operations on numbers object
        }

        // Define the event data with serial number and VIN included in event_content as JSON
        const eventData = {
            uuid,
            event_content: JSON.stringify({
                email: emailInput,
                serial: numbers ? numbers.serial : 'undefined',
                vin: numbers ? numbers.vin : 'undefined'
            }),
            event_time,
            event_type: "email_capture",
            event_page,
        };

        fetch(serverlessFunctionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

        })
        .catch((error) => {

        });

    function generateUUID() {
        // Implement your UUID generation logic here
        return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});