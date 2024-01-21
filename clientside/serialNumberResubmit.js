document.addEventListener('DOMContentLoaded', function() {
    // Extracting the order ID from the URL for the page view event
    const queryParams = new URLSearchParams(window.location.search);
    const orderID = queryParams.get('order_id');
    if (orderID) {
      const pageViewData = { orderID: orderID, event: "page_view" };
      axios.post('https://unlockcarstereo-magnus1000team.vercel.app/api/sendPageview.js', pageViewData)
        .then(response => console.log('Success:', response.data))
        .catch(error => console.error('Error:', error));
    } else {
      console.log('Order ID not found in URL');
    }
  
    // Listening to a click on the button with ID "resubmitSerial"
    const resubmitButton = document.querySelector('#resubmitSerial');
    resubmitButton.addEventListener('click', async function() {
      // Change button text to "Sending..."
      resubmitButton.textContent = 'Sending...';
  
      // Get value from the input field
      const resubmitField = document.querySelector('#resubmitField').value;
  
      // Prepare data for serverless function
      const resubmitData = { orderID: orderID, serialNumber: resubmitField };
  
      // Send data to serverless function
      try {
        const response = await axios.post('https://unlockcarstereo-magnus1000team.vercel.app/api/submitForm.js', resubmitData);
        if (response.status === 200) {
          // Redirect on success
          window.location.href = 'https://www.unlockcarstereo.com/success';
        } else {
          console.error('Error:', response.statusText);
          resubmitButton.textContent = 'Resubmit';
        }
      } catch (error) {
        console.error('Error:', error.message);
        resubmitButton.textContent = 'Resubmit';
      }
    });
});
  