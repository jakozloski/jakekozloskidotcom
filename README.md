# Jake Kozloski Personal Website

A simple, lightweight personal website built with vanilla HTML, CSS, and JavaScript using Vercel's design system.

## Features

- Clean, modern design using Vercel's design system colors and typography
- Responsive layout that works on all devices
- Dinner signup form with Google Sheets integration
- Email notifications for new signups
- Static site - no server required

## Setup Instructions

### 1. Add Your Headshot

Replace the placeholder `headshot.jpg` with your actual headshot image. The image should be:
- Square aspect ratio (recommended: 400x400px or higher)
- Good quality and well-lit
- Professional headshot style

### 2. Set Up Google Apps Script for Form Submissions

To enable the dinner signup form with Google Sheets integration:

1. **Create a new Google Apps Script project:**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Replace the default code with the code from `google-apps-script.js`

2. **Deploy as a web app:**
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the web app URL

3. **Update the website:**
   - Open `script.js`
   - Replace `YOUR_SCRIPT_ID` in the WEBHOOK_URL with your actual web app URL
   - Make sure the email address in the Google Apps Script is correct

4. **Test the setup:**
   - Run the `testSetup()` function in Google Apps Script
   - Check that a Google Sheet was created and you received an email

### 3. Deploy the Website

You can deploy this static website to any hosting service:

#### Vercel (Recommended)
1. Push your code to a GitHub repository
2. Connect your GitHub repo to Vercel
3. Deploy automatically

#### Netlify
1. Drag and drop the folder to Netlify
2. Or connect your GitHub repository

#### GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings

### 4. Customize Content

Edit the content in `index.html`:
- Update bio information
- Add or remove social links
- Modify the interviews section
- Add blog posts when ready

## File Structure

```
├── index.html              # Main website file
├── style.css              # Styling with Vercel design system
├── script.js              # Form handling and interactions
├── google-apps-script.js  # Backend code for Google Apps Script
├── headshot.jpg          # Your headshot image
└── README.md             # This file
```

## Design System

This website uses Vercel's design system:
- **Colors**: Clean blacks, grays, and whites with blue accents
- **Typography**: Inter font family (similar to Geist)
- **Spacing**: Consistent 8px grid system
- **Components**: Minimal, clean design elements

## Form Data Structure

The dinner signup form collects:
- Name (required)
- Email (required)
- Company (optional)
- Role (Founder/Investor/Other)
- Bio (optional)
- Timestamp (automatic)

All submissions are saved to a Google Sheet named "NYC Dinner Signups" and trigger email notifications.

## Customization

### Colors
Modify the CSS variables in `style.css` to change colors:
```css
:root {
    --geist-foreground: #000;
    --geist-background: #fff;
    --geist-success: #0070f3;
    /* ... other colors */
}
```

### Typography
The website uses Inter font. To change fonts, update the font import in `index.html` and the `font-family` in `style.css`.

### Sections
Add or remove sections by modifying the HTML structure and updating the navigation links.

## Support

For issues or questions, contact jakozloski@gmail.com or create an issue in the repository.

## License

This project is open source and available under the MIT License. 