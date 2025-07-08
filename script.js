document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const form = document.getElementById('dinner-form');
    if (!form) return; // Exit if form doesn't exist on this page
    
    const submitBtn = form.querySelector('.submit-btn');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Requesting...';
        messageDiv.style.display = 'none';
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        try {
            // Replace this URL with your Google Apps Script webhook URL
            const WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
            
            // Check if webhook is configured
            if (WEBHOOK_URL.includes('YOUR_SCRIPT_ID')) {
                // Fallback: Show success message and log to console for testing
                console.log('Form submission (webhook not configured):', data);
                showMessage('Demo mode: Form submitted successfully! Configure Google Apps Script webhook to enable real functionality.', 'success');
                form.reset();
                return;
            }
            
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showMessage('Thanks for signing up! You\'ll receive confirmation and dinner details soon.', 'success');
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('There was an error submitting your signup. Please try again or email jakozloski@gmail.com directly.', 'error');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request a Seat';
        }
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
});

// Add smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
}); 