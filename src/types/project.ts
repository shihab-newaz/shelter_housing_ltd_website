export type ProjectStatus = "ongoing" | "completed" | "upcoming";

export interface Project {
  id: string;
  title: string;
  location: string;
  status: ProjectStatus;
  image: string;
  description: string;
  type: string;
  units?: number;
  completionDate?: string;
  brochureUrl?: string;
}
