export type ProjectStatus = "ongoing" | "completed" | "upcoming";

export interface Project {
  id: string;
  title: string;
  location: string;
  status: ProjectStatus;
  image: string;
  landArea?: string; // e.g., "5 Katha"
  buildingHeight?: string; // e.g., "G+7 (8 Storied)"
  flatSizes?: string[]; // e.g., ["Type-A 1220 sft", "Type-B 1150 sft"]
  units?: number;
  completionDate?: string;
  brochureUrl?: string;
  details?: {
    elevator?: string;
    parking?: string;
    floors?: string;
  };
}
