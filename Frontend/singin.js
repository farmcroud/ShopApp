document.getElementById('shop-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const email = document.getElementById('signinemail').value;
    const password = document.getElementById('signinpassword').value;

    try {
        // Send a POST request to your API
        const response = await fetch('http://localhost:3000/api/v1/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        // Handle the response
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();
        console.log('Shop data submitted:', result);
        alert('Signed in Successfully!');
    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error submitting data. Please try again.');
    }
});