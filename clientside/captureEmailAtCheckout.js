// Step 1: Add an event listener to the field with ID 'wf-ecom-email'
document.getElementById('wf-ecom-email').addEventListener('change', function(event) {
    // Step 2: Capture the input value
    const emailInput = event.target.value;

    // Check if the email input is a valid email before sending
    if (!emailInput.includes('@')) {
        console.error('Invalid email address.');
        return; // Exit the function if the email is not valid
    }

    // Step 3: Define the URL of the Vercel serverless function
    const serverlessFunctionUrl = 'https://your-vercel-project-url/api/createEvents';

    // Step 4: Create the data object to be sent
    const dataToSend = {
        email: emailInput
    };

    // Step 5: Use fetch API to send the data to the serverless function
    fetch(serverlessFunctionUrl, {
        method: 'POST', // Use POST method
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(dataToSend), // Convert the JavaScript object to a JSON string
    })
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
        console.log('Success:', data); // Log success message and data
    })
    .catch((error) => {
        console.error('Error:', error); // Log any errors
    });
});