# Zoho SMTP setup for Omkar Stays forms

1. Install dependencies:
   npm install

2. Create a .env file from .env.example and fill in your Zoho credentials:
   PORT=3000
   ZOHO_EMAIL=info@omkarstays.com
   ZOHO_PASSWORD=your_zoho_app_password
   RECIPIENT_EMAIL=info@omkarstays.com

3. Start the server:
   npm start

4. Make sure your site runs on the same origin as the backend, or deploy both together.

5. For Zoho, you may need to generate an App Password if 2FA is enabled.

6. If Zoho blocks SMTP from your environment, verify the account and enable SMTP access in the Zoho Mail settings.
