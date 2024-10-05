document.getElementById('shop-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const shopData = {
        shopName: document.getElementById('shopName').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        aadharCard: document.getElementById('aadharCard').value,
        panCard: document.getElementById('panCard').value,
        mobileNumber: document.getElementById('mobileNumber').value,
        email: document.getElementById('email').value,
        prabhagNumber: document.getElementById('prabhagNumber').value,
        wardNumber: document.getElementById('wardNumber').value,
    };

    console.log('Form Data:', shopData);

    // TODO: Add backend code for saving the data.
});
