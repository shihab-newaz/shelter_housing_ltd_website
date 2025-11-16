import { Project } from "@/types/project";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

export const projects: Project[] = [
  {
    id: "1",
    title: "Emerald Heights",
    location: "Downtown District",
    status: "completed",
    image: project1,
    description: "A luxurious residential complex featuring 120 premium apartments with world-class amenities.",
    type: "Residential",
    units: 120,
    completionDate: "2023",
  },
  {
    id: "2",
    title: "Skyline Corporate Tower",
    location: "Business Hub",
    status: "completed",
    image: project2,
    description: "State-of-the-art commercial office space designed for modern enterprises.",
    type: "Commercial",
    completionDate: "2022",
  },
  {
    id: "3",
    title: "Serenity Villas",
    location: "Coastal Area",
    status: "completed",
    image: project3,
    description: "Exclusive waterfront villas offering unparalleled luxury and privacy.",
    type: "Luxury Residential",
    units: 24,
    completionDate: "2023",
  },
  {
    id: "4",
    title: "Horizon Residences",
    location: "Midtown",
    status: "ongoing",
    image: project4,
    description: "Modern high-rise living with panoramic city views and premium facilities.",
    type: "Residential",
    units: 180,
    completionDate: "Q2 2025",
  },
  {
    id: "5",
    title: "Garden Court",
    location: "Suburb District",
    status: "ongoing",
    image: project5,
    description: "Contemporary residential development with extensive green spaces and family-friendly amenities.",
    type: "Residential",
    units: 90,
    completionDate: "Q4 2024",
  },
  {
    id: "6",
    title: "Pinnacle Plaza",
    location: "Central District",
    status: "upcoming",
    image: project6,
    description: "Mixed-use development combining luxury residences, retail, and entertainment spaces.",
    type: "Mixed-Use",
    units: 250,
    completionDate: "2026",
  },
];
