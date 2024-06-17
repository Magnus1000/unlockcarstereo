document.addEventListener('DOMContentLoaded', function() {
    const emailField = document.getElementById('wf-ecom-email');
    
    if (!emailField) {
        return;
    }

    emailField.addEventListener('change', function(event) {
        let uuid = Cookies.get('uuid');

        if (!uuid) {
            uuid = generateUUID();
            Cookies.set('uuid', uuid, { expires: 365 });
        }

        const emailInput = event.target.value;

        if (!emailInput.includes('@')) {
            console.error('Invalid email address:', emailInput);
            return;
        }

        const serverlessFunctionUrl = 'https://unlockcarstereo-magnus1000team.vercel.app/api/createUserEvent.js';
        const event_time = new Date().toISOString();
        const event_page = '/checkout';
        const browserLanguage = navigator.language || navigator.userLanguage; // Capture the user's browser language

        const numbers = JSON.parse(sessionStorage.getItem('numbers'));

        const eventData = {
            uuid,
            event_content: JSON.stringify({
                email: emailInput,
                serial: numbers ? numbers.serial : 'undefined',
                vin: numbers ? numbers.vin : 'undefined',
                language: browserLanguage // Include the browser language in the event content
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
            // Handle success
        })
        .catch((error) => {
            // Handle error
        });
    });

    function generateUUID() {
        return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});