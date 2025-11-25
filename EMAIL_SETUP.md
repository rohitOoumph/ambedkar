# Email Setup Guide for Pledge Certificate

This guide explains how to configure email sending for the pledge certificate feature.

## Current Status

The pledge form is fully functional, but email sending needs to be configured. Currently, the system logs email details to the console for development purposes.

## Email Service Options

### Option 1: Resend (Recommended for Next.js)

Resend is a modern email API service that's easy to integrate with Next.js.

1. **Sign up** at [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Add to `.env.local`**:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```
4. **Uncomment Resend code** in `app/api/pledge/route.ts` (lines 47-62)
5. **Update the from email** to your verified domain email

### Option 2: Nodemailer with SMTP

Use Nodemailer with any SMTP provider (Gmail, SendGrid, AWS SES, etc.).

1. **Install nodemailer**:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Add SMTP credentials to `.env.local`**:
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@yourdomain.com
   ```

3. **Uncomment Nodemailer code** in `app/api/pledge/route.ts` (lines 66-85)

### Option 3: SendGrid

1. **Sign up** at [sendgrid.com](https://sendgrid.com)
2. **Get your API key**
3. **Install SendGrid SDK**:
   ```bash
   npm install @sendgrid/mail
   ```
4. **Add to `.env.local`**:
   ```bash
   SENDGRID_API_KEY=SG.your_api_key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```
5. **Update `app/api/pledge/route.ts`** to use SendGrid SDK

### Option 4: AWS SES

1. **Set up AWS SES** in your AWS account
2. **Get SMTP credentials** from AWS SES
3. **Use Nodemailer** (Option 2) with AWS SES SMTP settings

## Testing

For development, the current setup logs email details to the console. To test:

1. Fill out the pledge form
2. Check your server console for the email details
3. Copy the HTML and open it in a browser to preview the certificate

## Production Checklist

- [ ] Choose and configure an email service
- [ ] Add API keys/credentials to `.env.local`
- [ ] Uncomment the appropriate email sending code
- [ ] Test with a real email address
- [ ] Update the `from` email address to your domain
- [ ] Verify email deliverability
- [ ] Set up email service in production environment variables

## Certificate Format

The certificate is sent as an HTML email with:
- Professional certificate design
- Recipient's name
- All pledge commitments
- Foundation branding
- Date of issue

The certificate is optimized for both email clients and printing.

## Troubleshooting

### Email not sending
- Check API keys are correct in `.env.local`
- Verify email service account is active
- Check server logs for error messages
- Ensure `from` email is verified with your email service

### Certificate not displaying correctly
- Test HTML in different email clients
- Check for HTML/CSS compatibility issues
- Verify certificate HTML is being generated correctly

## Support

For issues with email configuration, refer to your chosen email service's documentation.

