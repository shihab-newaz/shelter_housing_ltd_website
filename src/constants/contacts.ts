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
    details: ["01755605072", "01755605073", " 01755605075", "01755605080"],
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

export const PHONE_NUMBER_MAIN = "01755605072";
export const PHONE_NUMBER_HOTLINE = "09617335588";