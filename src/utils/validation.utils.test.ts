import { validateEmail } from './validation.utils';

describe('validateEmail', () => {
  it('returns true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('test.email@example.com')).toBe(true);
    expect(validateEmail('first.last@example.com')).toBe(true);
    expect(validateEmail('test123@example.com')).toBe(true);
    expect(validateEmail('test+123@example.com')).toBe(true);
  });

  it('returns false for invalid email', () => {
    expect(validateEmail('')).toBe(false); // Empty string
    expect(validateEmail('test')).toBe(false); // Missing @ and domain
    expect(validateEmail('test@')).toBe(false); // Missing domain
    expect(validateEmail('@example.com')).toBe(false); // Missing local part
    expect(validateEmail('test@example')).toBe(false); // Missing top-level domain
    expect(validateEmail('test@.com')).toBe(false); // Missing domain name
    expect(validateEmail('test@example.')).toBe(false); // Missing top-level domain extension
    expect(validateEmail('test example@example.com')).toBe(false); // Contains whitespace
    expect(validateEmail('test@example,com')).toBe(false); // Invalid characters
    expect(validateEmail('test@example_com')).toBe(false); // Underscore in domain
  });
});
