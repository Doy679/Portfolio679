export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters.";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
