import { ProjectStatus } from "@/types/project";

export const projectFilters: { label: string; value: ProjectStatus }[] = [
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Upcoming", value: "upcoming" },
];