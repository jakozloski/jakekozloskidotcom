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
            const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyTunbSUetNnewwl3cT-t1KeN09HgRBTsucbr0Q3ndHnE8DvIDjsd2JcW8Ebaf6djCR/exec';
            
            // Log form submission for debugging
            console.log('Form submission:', data);
            
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showMessage('Thanks for requesting a seat! You\'ll receive confirmation and dinner details soon.', 'success');
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