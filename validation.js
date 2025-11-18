document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiryForm');
    const messagesDiv = document.getElementById('formMessages');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the default form submission
            messagesDiv.innerHTML = ''; // Clear previous messages
            let errors = [];

            // 1. Validate Required Fields
            const requiredInputs = form.querySelectorAll('[required]');
            requiredInputs.forEach(input => {
                // Check if the input value is empty or just whitespace
                if (input.value.trim() === '') {
                    // Use a user-friendly field name for the error message
                    let fieldName = input.id.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    errors.push(`The field "${fieldName}" is required.`);
                }
            });

            // 2. Validate Email Format
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
                errors.push("Please enter a valid email address.");
            }

            // 3. Validate Guest Count (Minimum 10)
            const guestsInput = document.getElementById('guests');
            if (guestsInput.value && parseInt(guestsInput.value) < 10) {
                errors.push("The estimated number of guests must be at least 10.");
            }
            
            // 4. Validate Date (Cannot be in the past)
            const dateInput = document.getElementById('date');
            const today = new Date().toISOString().split('T')[0];
            if (dateInput.value && dateInput.value < today) {
                errors.push("The event date cannot be in the past.");
            }

            if (errors.length > 0) {
                // Display Errors
                let errorHtml = '<ul style="padding-left: 20px;">';
                errors.forEach(err => {
                    errorHtml += `<li style="color: red;">${err}</li>`;
                });
                errorHtml += '</ul>';
                messagesDiv.innerHTML = `<p style="color: red; font-weight: bold;">Please correct the following errors:</p>${errorHtml}`;
            } else {
                // Success: Form is valid.
                messagesDiv.innerHTML = '<p style="color: green; font-weight: bold;">Enquiry successfully validated and submitted! We will contact you shortly.</p>';
                form.reset();
                // In a live project, this is where you would allow the form to submit to the server.
            }
        });
    }
});