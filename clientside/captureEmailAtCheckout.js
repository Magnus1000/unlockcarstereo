document.getElementById('wf-ecom-email').addEventListener('change', function(event) {
    // Attempt to retrieve the uuid from cookies
    let uuid = Cookies.get('uuid');

    // If uuid doesn't exist, generate a new one and store it in cookies
    if (!uuid) {
        uuid = generateUUID();
        Cookies.set('uuid', uuid, { expires: 365 }); // Store uuid in cookies with a 1-year expiration
    }

    const emailInput = event.target.value;

    if (!emailInput.includes('@')) {
        console.error('Invalid email address.');
        return; // Exit the function if the email is not valid
    }

    const serverlessFunctionUrl = 'https://unlockcarstereo-magnus1000team.vercel.app/api/createUserEvent.js';

    // Add the URL to the event data
    const event_page = '/checkout'; // Assuming 'url' should be the current page URL

    // Retrieve serial info from sessionStorage
    const numbers = JSON.parse(sessionStorage.getItem('numbers'));

    // Define the event data with serial number and VIN included in event_content as JSON
    const eventData = {
        uuid,
        event_content: JSON.stringify({
            email: emailInput,
            serial: numbers.serial,
            vin: numbers.vin
        }),
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
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});