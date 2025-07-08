// Google Apps Script Code for Dinner Signup Form
// This code should be deployed as a web app in Google Apps Script

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Add the data to the sheet
    addDataToSheet(sheet, data);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  // Try to get existing spreadsheet by name
  const files = DriveApp.getFilesByName('NYC Dinner Signups');
  let spreadsheet;
  
  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.openById(files.next().getId());
  } else {
    // Create new spreadsheet
    spreadsheet = SpreadsheetApp.create('NYC Dinner Signups');
  }
  
  let sheet = spreadsheet.getSheetByName('Signups');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Signups');
    
    // Add headers
    const headers = [
      'Timestamp',
      'Name',
      'Email',
      'Company',
      'Role',
      'X Handle',
      'LinkedIn',
      'Bio'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#f0f0f0');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(12);
    
    // Set column widths
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 200); // Name
    sheet.setColumnWidth(3, 250); // Email
    sheet.setColumnWidth(4, 200); // Company
    sheet.setColumnWidth(5, 150); // Role
    sheet.setColumnWidth(6, 150); // X Handle
    sheet.setColumnWidth(7, 250); // LinkedIn
    sheet.setColumnWidth(8, 300); // Bio
  }
  
  return sheet;
}

function addDataToSheet(sheet, data) {
  const rowData = [
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.company || '',
    data.role || '',
    data.x_handle || '',
    data.linkedin || '',
    data.bio || ''
  ];
  
  // Add to the next available row
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  
  // Auto-resize columns if needed
  sheet.autoResizeColumns(1, rowData.length);
}

function sendEmailNotification(data) {
  const subject = 'New NYC Dinner Signup';
  const recipient = 'jakozloski@gmail.com'; // Change this to your email
  
  const body = `
New signup for NYC Consumer Dinners:

Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Company: ${data.company || 'Not provided'}
Role: ${data.role || 'Not provided'}
X Handle: ${data.x_handle || 'Not provided'}
LinkedIn: ${data.linkedin || 'Not provided'}
Bio: ${data.bio || 'Not provided'}

Timestamp: ${data.timestamp || 'Not provided'}

You can view all signups in your Google Sheet: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]
  `;
  
  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't fail the entire request if email fails
  }
}

// Optional: Test function to verify setup
function testSetup() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    role: 'founder',
    x_handle: '@testuser',
    linkedin: 'https://linkedin.com/in/testuser',
    bio: 'This is a test signup',
    timestamp: new Date().toISOString()
  };
  
  try {
    const sheet = getOrCreateSheet();
    addDataToSheet(sheet, testData);
    sendEmailNotification(testData);
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Handle CORS for web requests
function doGet(e) {
  return ContentService
    .createTextOutput('Dinner signup webhook is running')
    .setMimeType(ContentService.MimeType.TEXT);
} 