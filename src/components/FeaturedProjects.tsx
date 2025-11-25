import { useState, useEffect, useRef } from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { projects } from "@/constants/projects";
import { projectFilters } from "@/constants/featuredProjects";
import { ProjectStatus, Project } from "@/types/project";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectDetailModal from "./ProjectDetailModal";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>("ongoing");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselContentRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (project) => project.status === activeFilter
  );

  // Determine alignment based on number of projects
  const shouldCenterAlign = filteredProjects.length < 5;

  useEffect(() => {
    // Animate filter change
    if (carouselContentRef.current) {
      gsap.fromTo(
        carouselContentRef.current.querySelectorAll("[data-project-card]"),
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, [activeFilter]);

  useEffect(() => {
    // Scroll-triggered animation for section entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelector("h2"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 bg-geometric bg-muted"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6">Featured Projects</h2>

          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-lg shadow-card">
            {projectFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold hover-spring text-xs sm:text-sm md:text-base",
                  activeFilter === filter.value
                    ? "bg-gold text-primary shadow-md scale-105"
                    : "text-muted-foreground hover:text-primary hover:bg-sage/20 hover:scale-105"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: filteredProjects.length > 4,
            }}
            className="w-full mx-auto max-w-[calc(100%-6rem)] sm:max-w-[calc(100%-8rem)] lg:max-w-[calc(100%-10rem)]"
          >
            <CarouselContent 
              ref={carouselContentRef} 
              className={cn(
                "-ml-2 md:-ml-4",
                shouldCenterAlign && "justify-center"
              )}
            >  {filteredProjects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div
                    data-project-card
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-elegant hover-lift bg-noise cursor-pointer"
                    onClick={() => handleViewDetails(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                      <div className="h-1 w-10 sm:w-12 bg-gold mb-2 sm:mb-3" />
                      <h3 className="text-lg sm:text-xl font-bold mb-1 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm mb-1 text-white/90 line-clamp-1">
                        {project.location}
                      </p>
                      <p className="text-xs text-white/80 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-sage/30 backdrop-blur-sm rounded-full text-mono-light">
                            {project.type}
                          </span>
                          {project.units && (
                            <span className="px-2 py-1 bg-gold/30 backdrop-blur-sm rounded-full text-mono-light">
                              {project.units} Units
                            </span>
                          )}
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(project);
                          }}
                          size="sm"
                          className="bg-gold hover:bg-gold/90 text-primary font-semibold gap-1.5 hover-spring hover:scale-105 hover:shadow-lg text-xs px-3"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 sm:-left-14 lg:-left-16 border-sage text-sage hover:bg-sage hover:text-white hover-spring h-10 w-10 sm:h-12 sm:w-12" />
            <CarouselNext className="-right-12 sm:-right-14 lg:-right-16 border-sage text-sage hover:bg-sage hover:text-white hover-spring h-10 w-10 sm:h-12 sm:w-12" />
          </Carousel>
        </div>

        {/* Project count indicator */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} in {activeFilter} category
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FeaturedProjects;
