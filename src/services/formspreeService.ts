import { ContactFormData } from '@/lib/contactFormSchema';

// Formspree configuration (alternative to EmailJS)
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export interface FormspreeResponse {
  success: boolean;
  message: string;
}

export const sendContactFormspree = async (formData: ContactFormData): Promise<FormspreeResponse> => {
  try {
    if (!FORMSPREE_ENDPOINT) {
      return {
        success: false,
        message: 'Form service is not configured. Please contact us directly at +91 9442434269.'
      };
    }

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
        _subject: `New Contact Form: ${formData.subject}`,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.'
      };
    } else {
      throw new Error(`Formspree returned status: ${response.status}`);
    }

  } catch (error) {
    console.error('Error sending form via Formspree:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please call us directly at +91 9442434269.'
    };
  }
};

// Alternative: Simple form submission to any endpoint
export const sendContactGeneric = async (
  formData: ContactFormData, 
  endpoint: string
): Promise<FormspreeResponse> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.'
      };
    } else {
      throw new Error(`Server returned status: ${response.status}`);
    }

  } catch (error) {
    console.error('Error sending form:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please call us directly at +91 9442434269.'
    };
  }
};
