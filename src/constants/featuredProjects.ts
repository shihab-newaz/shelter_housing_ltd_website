import { ProjectStatus } from "@/types/project";

export const projectFilters: { label: string; value: ProjectStatus }[] = [
  { label: "Ongoing", value: ProjectStatus.ONGOING },
  { label: "Completed", value: ProjectStatus.COMPLETED },
  { label: "Upcoming", value: ProjectStatus.UPCOMING },
];