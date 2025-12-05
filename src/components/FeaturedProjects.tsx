import { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { projects } from "@/constants/projects";
import { projectFilters } from "@/constants/projectFilters";
import { ProjectStatus, Project } from "@/types/project";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Ruler,
  Building,
  Home,
  Calendar,
  Car,
  ArrowUpDown,
  Layers,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>(ProjectStatus.ONGOING);

  const filteredProjects = projects.filter(
    (project) => project.status === activeFilter
  );

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    className,
  }: {
    icon: any;
    label: string;
    value?: string | number;
    className?: string;
  }) => {
    if (!value) return null;
    return (
      <div className={cn("flex items-start gap-3 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800", className)}>
        <div className="p-2 rounded-full bg-white dark:bg-neutral-700 shadow-sm text-gold">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium uppercase tracking-wide">{label}</p>
          <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white mt-0.5">{value}</p>
        </div>
      </div>
    );
  };

  const ProjectContent = ({ project }: { project: Project }) => {
    return (
      <div className="bg-neutral-50 dark:bg-neutral-800 p-6 md:p-10 rounded-3xl space-y-6">
        {/* Location */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
          <div className="p-2.5 bg-gold/10 rounded-full text-gold shrink-0">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white text-lg mb-1">Project Location</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
              {project.details?.fullAddress || project.location}
            </p>
          </div>
        </div>

        {/* Project Details Grid */}
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-gold" />
            Project Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem icon={Ruler} label="Land Area" value={project.landArea} />
            <DetailItem icon={Layers} label="No. of Floors" value={project.details?.floors || project.buildingHeight} />
            <DetailItem icon={Home} label="Total Units" value={project.units ? `${project.units} Units` : undefined} />
            <DetailItem icon={ArrowUpDown} label="Elevator" value={project.details?.elevator} />
            <DetailItem icon={Car} label="Parking" value={project.details?.parking} />
            <DetailItem icon={Calendar} label="Completion" value={project.completionDate} />
          </div>
        </div>

        {/* Flat Sizes */}
        {project.flatSizes && project.flatSizes.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-gold" />
              Available Flat Sizes
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.flatSizes.map((size, index) => (
                <Badge
                  key={index}
                  className="px-4 py-2 text-sm sm:text-base bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-gold/10 hover:border-gold/50"
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Brochure Download Action */}
        {project.brochureUrl && (
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              className="w-full sm:w-auto min-w-[200px] bg-gold hover:bg-gold/90 text-primary font-bold text-lg h-14 shadow-lg hover:shadow-xl transition-all rounded-xl gap-3"
              onClick={() => project.brochureUrl !== "#" && window.open(project.brochureUrl, "_blank")}
            >
              <Download className="h-5 w-5" />
              Download Brochure
            </Button>
            <p className="text-center sm:text-left text-sm text-neutral-600 dark:text-neutral-400 mt-3 ml-1">
              Get detailed floor plans and pricing information.
            </p>
          </div>
        )}
      </div>
    );
  };

  const cards = filteredProjects.map((project, index) => ({
    src: project.image,
    title: project.title,
    category: project.location || "Dhaka",
    content: <ProjectContent project={project} />,
  }));

  const cardElements = cards.map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <section id="projects" className="bg-geometric bg-muted">
      <div className="w-full h-full py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
            Featured Projects
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {projectFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                  activeFilter === filter.value
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground hover:scale-105"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <Carousel items={cardElements} />
      </div>
    </section>
  );
};

export default FeaturedProjects;
