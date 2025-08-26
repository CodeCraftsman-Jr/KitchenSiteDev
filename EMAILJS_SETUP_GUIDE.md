# EmailJS Setup Guide for Vasanth's Kitchen Contact Form

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or any SMTP service
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Contact Form Submission - {{subject}}

**Content:**
```
Hello Vasanth's Kitchen Team,

You have received a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Subject: {{subject}}

Message:
{{message}}

Submitted at: {{submitted_at}}

Please respond to this customer inquiry promptly.

Best regards,
Website Contact Form
```

4. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_def456`)

### Step 5: Update Environment Variables
1. Open `.env.local` in your project
2. Replace the placeholder values:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_def456
```

### Step 6: Test the Form
1. Start your development server: `npm run dev`
2. Go to the contact form
3. Fill out and submit a test message
4. Check your email for the message

## 🎯 Template Variables Used

The contact form sends these variables to your email template:
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{from_phone}}` - Customer's phone
- `{{subject}}` - Message subject
- `{{message}}` - Customer's message
- `{{submitted_at}}` - Timestamp (India time)
- `{{to_name}}` - Your restaurant name
- `{{reply_to}}` - Customer's email for replies

## 📧 Email Template Customization

You can customize the email template in EmailJS dashboard:
- Add your restaurant logo
- Change colors and styling
- Add automatic reply templates
- Set up multiple recipients

## 🔧 Advanced Configuration

### Multiple Recipients
In your EmailJS template, you can send to multiple emails:
- Main: `orders@vasanthskitchen.com`
- Manager: `manager@vasanthskitchen.com`
- Owner: `vasanth@vasanthskitchen.com`

### Auto-Reply Setup
Create a second template for customer auto-replies:
```
Subject: Thank you for contacting Vasanth's Kitchen!

Dear {{from_name}},

Thank you for your message. We have received your inquiry about "{{subject}}" and will respond within 24 hours.

Our operating hours: 9:00 AM - 12:00 PM daily
Phone: +91 9442434269
Address: Plot No: 50, 51 Mettu Street, Chinna Kalapet, Puducherry

Best regards,
Vasanth's Kitchen Team
```

## 🚨 Troubleshooting

### Common Issues:
1. **"Email service not configured"** - Check environment variables
2. **"Network error"** - Check internet connection
3. **"Invalid template"** - Verify template ID and variables
4. **Emails not received** - Check spam folder, verify email service

### Testing Tips:
- Use your personal email for testing
- Check EmailJS dashboard for delivery logs
- Verify all template variables are spelled correctly
- Test with different email providers

## 💰 Pricing
- **Free Plan**: 200 emails/month
- **Personal Plan**: $15/month for 1,000 emails
- **Professional Plan**: $35/month for 5,000 emails

For a restaurant, the free plan should be sufficient initially.

## 🔒 Security Notes
- Never commit `.env.local` to version control
- EmailJS public key is safe to expose (it's meant to be public)
- Consider rate limiting for production use
- Monitor usage in EmailJS dashboard

## 📱 Mobile Testing
The form is fully responsive and works on:
- Desktop browsers
- Mobile phones
- Tablets
- All modern browsers

Your contact form is now ready to receive customer inquiries! 🎉
