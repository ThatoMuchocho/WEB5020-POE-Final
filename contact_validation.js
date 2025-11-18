
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messagesDiv = document.getElementById('contactFormMessages');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            messagesDiv.innerHTML = ''; // Clear previous messages
            let errors = [];

            // Helper function to get the displayed name of the field
            function getFieldName(input) {
                let label = document.querySelector(`label[for="${input.id}"]`);
                return label ? label.textContent.replace('*', '').trim() : input.id;
            }

            // 1. Validate Required Fields (Name, Email, Message)
            const requiredInputs = form.querySelectorAll('[required]');
            requiredInputs.forEach(input => {
                if (input.value.trim() === '') {
                    errors.push(`The field '${getFieldName(input)}' is required.`);
                }
            });

            // 2. Validate Email Format (Only if field is not empty)
            const emailInput = document.getElementById('contact_email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
                errors.push("Please enter a valid email address.");
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
                messagesDiv.innerHTML = '<p style="color: green; font-weight: bold;">Message sent successfully! We will respond shortly.</p>';
                form.reset();
                // In a live project, you would execute the form submission here: form.submit();
            }
        });
    }
});