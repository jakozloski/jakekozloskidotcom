# Dinner Form Setup Instructions

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet 
3. Name it "NYC Dinner Signups" (or whatever you prefer)
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - Sheet ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Step 2: Deploy Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `google-apps-script.js`
4. Update the configuration at the top:
   ```javascript
   const CONFIG = {
     SHEET_ID: 'YOUR_ACTUAL_SHEET_ID', // Paste your sheet ID here
     SHEET_NAME: 'Dinner Signups',
     NOTIFICATION_EMAIL: 'jakozloski@gmail.com',
     SUBJECT_LINE: 'New NYC Dinner Signup'
   };
   ```

## Step 3: Deploy as Web App

1. In Apps Script, click "Deploy" > "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Set the following:
   - **Description**: "Dinner Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL (it looks like: `https://script.google.com/macros/s/ABC123.../exec`)

## Step 4: Test the Setup

1. In Apps Script, run the `testFormSubmission()` function
2. Check your Google Sheet - you should see a test entry
3. Check your email - you should receive a test notification

## Step 5: Update Frontend Code

Replace the webhook URL in `script.js`:

```javascript
// Replace this line:
const WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// With your actual web app URL:
const WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
```

## Step 6: Grant Permissions

When you first deploy or test:
1. You'll be prompted to authorize the script
2. Click "Review permissions"
3. Choose your Google account
4. Click "Advanced" if you see a warning
5. Click "Go to [Your Project Name] (unsafe)"
6. Click "Allow"

## What the Script Does

- **Form Submission**: Receives POST requests from your website form
- **Google Sheets**: Automatically creates/updates a sheet with signup data
- **Email Notifications**: Sends you an email for each new signup
- **Confirmation Emails**: Sends a confirmation email to the user
- **Error Handling**: Gracefully handles errors and provides feedback

## Troubleshooting

- **403 Errors**: Make sure the web app is deployed with "Anyone" access
- **Email Issues**: Ensure your Gmail API is enabled and script has email permissions
- **Sheet Issues**: Verify the Sheet ID is correct and the sheet is accessible
- **CORS Errors**: These are normal for cross-origin requests to Apps Script

## Security Notes

- The web app URL is public but only accepts POST requests
- Form data is validated before processing
- No sensitive data is exposed in client-side code
- All data is stored in your Google account 