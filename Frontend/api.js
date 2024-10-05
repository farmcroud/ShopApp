document.getElementById('shop-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const shopName = document.getElementById('shopName').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const aadharCard = document.getElementById('aadharCard').value;
    const panCard = document.getElementById('panCard').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const email = document.getElementById('email').value;
    const prabhagNumber = document.getElementById('prabhagNumber').value;
    const wardNumber = document.getElementById('wardNumber').value;

    // Options to enhance geolocation accuracy
    const geoOptions = {
        enableHighAccuracy: true, // Request higher accuracy (may take longer and use more power)
        timeout: 10000,           // Maximum wait time to retrieve the location (in milliseconds)
        maximumAge: 0             // Don't use a cached location
    };

    const earthRadiusInMeters = 6371000; // Earth’s radius in meters
    
    
    // Fetch the user's location (latitude and longitude)
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy; // In meters
        const accuracyInMeters = position.coords.accuracy; // Accuracy in meters (e.g., 50 meters)
        
        // Convert meters to degrees latitude
        const latOffset = accuracyInMeters / 111000; // Approximately 111,000 meters per degree of latitude
        
        // Convert meters to degrees longitude (adjust based on latitude)
        const lonOffset = accuracyInMeters / (111000 * Math.cos(latitude * Math.PI / 180));
        
        console.log(`Latitude +/-: ${latitude - latOffset} to ${latitude + latOffset}`);
        console.log(`Longitude +/-: ${longitude - lonOffset} to ${longitude + lonOffset}`);
        // Log the accuracy of the retrieved position
        console.log(`Location accuracy: ${accuracy} meters`);
        const googleMapsLinkWithBoundingBox = `https://www.google.com/maps?q=${latitude},${longitude}&ll=${latitude},${longitude}&spn=${latOffset},${lonOffset}`;
        console.log(googleMapsLinkWithBoundingBox);

        // Create Google Maps URL with coordinates
        const googleMapsLink = `https://www.google.com/maps?q=${latitude + latOffset},${longitude + lonOffset}`;

        try {
            // Send a POST request to your API
            const response = await fetch('http://localhost:3000/api/v1/user/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shopName,
                    firstName,
                    lastName,
                    aadharCard,
                    panCard,
                    mobileNumber,
                    email,
                    prabhagNumber,
                    wardNumber,
                    // location: {
                    //     type: "Point",
                    //     coordinates: [longitude, latitude],
                    // },
                    googleMapsLink,  // Google Maps URL with the coordinates
                }),
            });

            // Handle the response
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const result = await response.json();
            console.log('Shop data submitted:', result);
            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data. Please try again.');
        }
    }, (error) => {
        console.error('Error fetching location:', error);
        alert('Unable to retrieve location. Please allow location access.');
    }, geoOptions); // Pass the geoOptions object to request higher accuracy
});