import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { ProjectStatus, Project } from "@/types/project";
import ProjectDetailModal from "./ProjectDetailModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>("ongoing");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((project) => project.status === activeFilter);

  useEffect(() => {
    setActiveIndex(0);
    
    // Animate filter change
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current.children,
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

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const filters: { label: string; value: ProjectStatus }[] = [
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
    { label: "Upcoming", value: "upcoming" },
  ];

  return (
    <section id="projects" ref={containerRef} className="py-24 bg-geometric bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6 font-display">
            Featured Projects
          </h2>
          
          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-lg shadow-card">
            {filters.map((filter) => (
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
        <div
          className="relative"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Project carousel"
        >
          <div
            ref={carouselRef}
            className="flex items-center justify-center gap-3 sm:gap-6 overflow-hidden min-h-[400px] sm:min-h-[500px] px-2 sm:px-0"
          >
            {filteredProjects.map((project, index) => {
              const isCenter = index === activeIndex;
              const isPrevious = index === activeIndex - 1;
              const isNext = index === activeIndex + 1;
              const isVisible = isCenter || isPrevious || isNext;

              return (
                <div
                  key={project.id}
                  className={cn(
                    "transition-all duration-500 ease-elegant cursor-pointer flex-shrink-0",
                    isCenter
                      ? "w-[85vw] sm:w-[70vw] md:w-[600px] opacity-100 scale-100 z-20"
                      : "w-0 sm:w-[120px] md:w-[200px] opacity-40 scale-90 z-10",
                    !isVisible && "hidden sm:block"
                  )}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${project.title}`}
                >
                  <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-elegant hover-lift bg-noise">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    
                    {isCenter && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                        <div className="h-1 w-12 sm:w-16 bg-gold mb-2 sm:mb-4 animate-fade-in" />
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 font-display">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-white/90 font-sans">{project.location}</p>
                        <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 line-clamp-2 font-sans">{project.description}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                          <span className="px-2 sm:px-3 py-1 bg-sage/30 backdrop-blur-sm rounded-full font-mono text-mono-light">{project.type}</span>
                          {project.units && (
                            <span className="px-2 sm:px-3 py-1 bg-gold/30 backdrop-blur-sm rounded-full font-mono text-mono-light">{project.units} Units</span>
                          )}
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(project);
                          }}
                          size="sm"
                          className="bg-gold hover:bg-gold/90 text-primary font-semibold gap-2 hover-spring hover:scale-110 hover:shadow-lg"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">Details</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="border-sage text-sage hover:bg-sage hover:text-white h-8 w-8 sm:h-10 sm:w-10 hover-spring hover:scale-110"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 sm:h-2 rounded-full hover-spring",
                    index === activeIndex ? "bg-gold w-6 sm:w-8" : "bg-sage/40 w-1.5 sm:w-2 hover:bg-sage"
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="border-sage text-sage hover:bg-sage hover:text-white h-8 w-8 sm:h-10 sm:w-10 hover-spring hover:scale-110"
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
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
