export enum ProjectStatus {
  ONGOING = "ongoing",
  COMPLETED = "completed",
  UPCOMING = "upcoming",
}

export enum ElevatorType {
  NOT_AVAILABLE = "Not Available",
  AVAILABLE = "Available",
  ONE = "1 Nos",
  TWO = "2 Nos",
  THREE = "3 Nos",
  FOUR = "4 Nos",
}

export enum ParkingAvailability {
  NOT_AVAILABLE = "Not Available",
  AVAILABLE = "Available",
  LIMITED = "Limited",
}

export interface ProjectDetails {
  elevator?: ElevatorType;
  parking?: ParkingAvailability;
  floors?: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  status: ProjectStatus;
  image: string;
  landArea?: string;
  buildingHeight?: string;
  flatSizes?: string[];
  units?: number;
  completionDate?: string;
  brochureUrl?: string;
  details?: ProjectDetails;
}
