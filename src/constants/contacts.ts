import { MapPin, Phone, Mail, Clock } from "lucide-react";

/**
 * Contact information interface
 */
export interface ContactInfo {
  icon: React.ElementType;
  title: string;
  details: string[];
}

/**
 * Contact information configuration
 */
export const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Level 7, Grameen Banglar Akshay Tower",
      "51 Madani Ave, Dhaka 1212",
      "Bangladesh",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+8801755605080", "+8801755605073", "+8801755605075", "+8801755605072"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["shelterhousinglimited@gmail.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Sat-Thu: 10:00 AM - 5:00 PM"],
  },
];

export const PHONE_NUMBER_MAIN = "+8801755605080";
export const PHONE_NUMBER_HOTLINE = "+8809617335588";