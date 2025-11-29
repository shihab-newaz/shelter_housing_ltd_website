/**
 * Time and Duration Constants
 * Centralized management of all time-related values
 */

// Company founding year
export const COMPANY_FOUNDING_YEAR = 2006;

// Calculate years of experience dynamically
const getCurrentYear = () => new Date().getFullYear();
export const YEARS_OF_EXPERIENCE = getCurrentYear() - COMPANY_FOUNDING_YEAR;

// Company statistics
export const COMPANY_STATS = {
  founding_year: COMPANY_FOUNDING_YEAR,
  years_of_experience: YEARS_OF_EXPERIENCE,
  completed_projects: 25,
  happy_residents: 500,
} as const;

// Dynamic founding year text
export const FOUNDING_YEAR_TEXT = `Building exceptional residential homes in Dhaka since ${COMPANY_FOUNDING_YEAR}`;
export const CRAFTING_TEXT = `Crafting Luxury Living Since ${COMPANY_FOUNDING_YEAR}`;
