import { useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { projects } from "@/constants/projects";
import { projectFilters } from "@/constants/projectFilters";
import { ProjectStatus, Project } from "@/types/project";
import ProjectDetailsContent from "@/components/ProjectDetailsContent";
import { cn } from "@/lib/utils";

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>(ProjectStatus.ONGOING);

  const filteredProjects = projects.filter(
    (project) => project.status === activeFilter
  );

  const cards = filteredProjects.map((project, index) => ({
    src: project.image,
    title: project.title,
    category: project.location || "Dhaka",
    content: (
      <div className="bg-neutral-50 dark:bg-neutral-800 p-6 md:p-10 rounded-3xl">
        <ProjectDetailsContent project={project} />
      </div>
    ),
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
