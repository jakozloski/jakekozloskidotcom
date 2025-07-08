// Google Apps Script for handling dinner form submissions
// This code should be deployed as a web app in Google Apps Script

// Configuration - Update these values
const CONFIG = {
  SHEET_ID: '1znn_kPmePRWOMHeHs-HZZ_mqHIYPBFQGJQHIlK-UpEo', // Your Google Sheet ID
  SHEET_NAME: 'Dinner Signups', // Name of the sheet tab
  NOTIFICATION_EMAIL: 'jakozloski@gmail.com', // Your email for notifications
  SUBJECT_LINE: 'New NYC Dinner Signup'
};

/**
 * Handle POST requests from the dinner signup form
 */
function doPost(e) {
  try {
    // Check if postData exists (for proper HTTP POST requests)
    if (!e || !e.postData || !e.postData.contents) {
      console.error('Invalid request: missing postData');
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: 'Invalid request format'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Write to Google Sheet
    writeToSheet(data);
    
    // Send notification email
    sendNotificationEmail(data);
    
    // Send confirmation email to user
    sendConfirmationEmail(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Form submitted successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: 'Error processing submission'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Write form data to Google Sheet
 */
function writeToSheet(data) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    let worksheet = sheet.getSheetByName(CONFIG.SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!worksheet) {
      worksheet = sheet.insertSheet(CONFIG.SHEET_NAME);
      
      // Add headers
      const headers = [
        'Timestamp',
        'Name', 
        'Email',
        'Company',
        'Role',
        'X Handle',
        'LinkedIn',
        'Bio/Additional Info'
      ];
      worksheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = worksheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
    }
    
    // Add the new row
    const newRow = [
      new Date(data.timestamp),
      data.name || '',
      data.email || '',
      data.company || '',
      data.role || '',
      data.x_handle || '',
      data.linkedin || '',
      data.bio || ''
    ];
    
    worksheet.appendRow(newRow);
    
    // Auto-resize columns
    worksheet.autoResizeColumns(1, newRow.length);
    
  } catch (error) {
    console.error('Error writing to sheet:', error);
    throw error;
  }
}

/**
 * Send notification email to you
 */
function sendNotificationEmail(data) {
  try {
    const subject = `${CONFIG.SUBJECT_LINE} - ${data.name}`;
    
    const body = `
New dinner signup received!

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Role: ${data.role || 'Not provided'}
X Handle: ${data.x_handle || 'Not provided'}
LinkedIn: ${data.linkedin || 'Not provided'}
Additional Info: ${data.bio || 'Not provided'}

Submitted: ${new Date(data.timestamp).toLocaleString()}

---
This email was automatically generated from your dinner signup form.
    `;
    
    GmailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL, subject, body);
    
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
}

/**
 * Send confirmation email to the user
 */
function sendConfirmationEmail(data) {
  try {
    const subject = 'Thanks for signing up for NYC Consumer Dinners!';
    
    const body = `
Hi ${data.name},

Thanks for signing up for the NYC Consumer Dinners! 

I host monthly dinners bringing together consumer founders and investors in NYC. You'll receive an email with details about the next dinner soon.

In the meantime, feel free to reach out if you have any questions.

Best,
Jake

---
Jake Kozloski
Founder & CEO, Keeper
jakozloski@gmail.com
https://jakekozloski.com
    `;
    
    GmailApp.sendEmail(data.email, subject, body);
    
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw here - notification email is more important
  }
}

/**
 * Test function to verify everything works
 */
function testFormSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'jakozloski@gmail.com', // Use your email for testing
    company: 'Test Company',
    role: 'founder',
    x_handle: '@testuser',
    linkedin: 'https://linkedin.com/in/testuser',
    bio: 'This is a test submission'
  };
  
  try {
    console.log('Testing sheet write...');
    writeToSheet(testData);
    console.log('Sheet write successful!');
    
    console.log('Testing notification email...');
    sendNotificationEmail(testData);
    console.log('Notification email sent!');
    
    console.log('Testing confirmation email...');
    sendConfirmationEmail(testData);
    console.log('Confirmation email sent!');
    
    console.log('✅ All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Handle CORS for web requests
function doGet(e) {
  return ContentService
    .createTextOutput('Dinner signup webhook is running')
    .setMimeType(ContentService.MimeType.TEXT);
} 