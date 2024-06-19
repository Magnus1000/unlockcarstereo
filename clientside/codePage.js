document.addEventListener('DOMContentLoaded', function() {
  const params = getUrlParams(); // Call once and use throughout

  displayParams(params);
  sendUserEvent(params);
});

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    code: params.get('code'),
    serial: params.get('serial'),
    id: params.get('id'),
    email: params.get('email')
  };
}

function displayParams({ code, serial, id, email }) {
  if (code && serial && id) {
    const codeText = code.includes(',') ? 'Codes' : 'Code';
    document.getElementById('codeDiv').innerHTML = `<strong>${codeText}:</strong> ${code}`;
    document.getElementById('serialDiv').innerHTML = `<strong>Serial:</strong> ${serial}`;

    if (code.includes(',')) {
      document.getElementById('instructionsDiv').innerHTML = `
        If you have multiple codes, you need to try each code to see which one works.
        If you get a code error e, follow these instructions: 
        <a href="https://www.unlockcarstereo.com/troubleshooting/how-to-fix-honda-radio-code-error-e" target="_blank">
          https://www.unlockcarstereo.com/troubleshooting/how-to-fix-honda-radio-code-error-e
        </a>
      `;
    }

    if (email) {
      document.getElementById('emailDiv').innerHTML = `We've also emailed the codes to ${email}.`;
    }
  }
}

function sendUserEvent({ id }) {
  if (!id) {
    console.error('No ID found in URL parameters.');
    return;
  }

  const serverlessFunctionUrl = 'https://unlockcarstereo-magnus1000team.vercel.app/api/createUserEvent.js';
  const event_time = new Date().toISOString();
  const event_page = window.location.pathname;

  const eventData = {
    uuid: id,
    event_content: "page_view",
    event_time,
    event_type: "code_page_view",
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
  .then(data => console.log('User event sent successfully:', data))
  .catch(error => console.error('Error sending user event:', error));
}