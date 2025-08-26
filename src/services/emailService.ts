import emailjs from '@emailjs/browser';
import { ContactFormData } from '@/lib/contactFormSchema';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailResponse {
  success: boolean;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    // Validate environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS configuration missing. Please check your environment variables.');
      return {
        success: false,
        message: 'Email service is not configured. Please contact us directly at +91 9442434269.'
      };
    }

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      to_name: "Vasanth's Kitchen",
      reply_to: formData.email,
      // Add timestamp for tracking
      submitted_at: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.'
      };
    } else {
      throw new Error(`EmailJS returned status: ${response.status}`);
    }

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Network error. Please check your internet connection and try again.'
        };
      }
    }

    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please call us directly at +91 9442434269.'
    };
  }
};
