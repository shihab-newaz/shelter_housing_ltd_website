import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Sign up at https://www.emailjs.com/ to get your credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

/**
 * Initialize EmailJS with the public key
 * Call this once when your app starts (e.g., in main.tsx)
 */
export const initEmailJS = (): void => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

/**
 * Send contact form email using EmailJS
 * @param formData - The contact form data
 * @returns Promise with success status and message
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  // Validate configuration
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS is not configured. Please set up environment variables.');
    
    // Return success in development for testing purposes
    if (import.meta.env.DEV) {
      console.log('DEV MODE - Form data received:', formData);
      return {
        success: true,
        message: 'Development mode: Email would be sent with the provided data.',
      };
    }
    
    return {
      success: false,
      message: 'Email service is not configured. Please contact us directly.',
    };
  }

  try {
    // Template parameters - these should match  EmailJS template variables
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      message: formData.message,
      time: new Date().toLocaleString(), // Current timestamp
      to_name: 'Shelter Housing Ltd.', 
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Your message has been sent successfully!',
      };
    }

    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again later.',
    };
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (optional, basic validation)
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-+()]{7,20}$/;
  return phoneRegex.test(phone);
};
