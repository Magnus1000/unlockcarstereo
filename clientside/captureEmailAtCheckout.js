document.getElementById('wf-ecom-email').addEventListener('change', function(event) {
    console.log('Email input change event triggered');

    // Attempt to retrieve the uuid from cookies
    let uuid = Cookies.get('uuid');
    console.log('Retrieved uuid from cookies:', uuid);

    // If uuid doesn't exist, generate a new one and store it in cookies
    if (!uuid) {
        uuid = generateUUID();
        Cookies.set('uuid', uuid, { expires: 365 }); // Store uuid in cookies with a 1-year expiration
        console.log('Generated and stored new uuid:', uuid);
    }

    const emailInput = event.target.value;
    console.log('Email input value:', emailInput);

    if (!emailInput.includes('@')) {
        console.error('Invalid email address:', emailInput);
        return; // Exit the function if the email is not valid
    }

    const serverlessFunctionUrl = 'https://unlockcarstereo-magnus1000team.vercel.app/api/createUserEvent.js';
    console.log('Serverless function URL:', serverlessFunctionUrl);

    // Generate event time in ISO format
    const event_time = new Date().toISOString();
    console.log('Event time:', event_time);

    // Add the URL to the event data
    const event_page = '/checkout'; // Assuming 'url' should be the current page URL
    console.log('Event page:', event_page);

    // Retrieve serial info from sessionStorage
    const numbers = JSON.parse(sessionStorage.getItem('numbers'));
    console.log('Retrieved numbers from sessionStorage:', numbers);

    // Check if numbers is null or undefined
    if (!numbers) {
        console.error('Numbers object is null or undefined.');
    } else {
        // Log individual properties if numbers is not null/undefined
        console.log('Serial:', numbers.serial, 'VIN:', numbers.vin);
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
    console.log('Event data:', eventData);

    fetch(serverlessFunctionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })
    .then(response => {
        console.log('Fetch response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});