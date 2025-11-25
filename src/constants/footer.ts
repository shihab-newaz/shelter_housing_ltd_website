import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/shelterhousinglimited", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/shelterhousingltd/", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/in/Shelter%20Housing%20Limited", label: "LinkedIn" },
  { icon: Mail, href: "mailto:shelterhousinglimited@gmail.com", label: "Email" },
];