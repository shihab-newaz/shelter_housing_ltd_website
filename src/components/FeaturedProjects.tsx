import { useState, useEffect, useRef } from "react";
import { Eye, Download, MapPin } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import ProjectDetailModal from "./ProjectDetailModal";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>(ProjectStatus.ONGOING);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const filteredProjects = projects.filter(
    (project) => project.status === activeFilter
  );

  // Determine alignment based on number of projects
  const shouldCenterAlign = filteredProjects.length < 5;

  useEffect(() => {
    // Skip animations on mobile for better performance
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReducedMotion) return;

    // Animate filter change (desktop only)
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
  }, [activeFilter, isMobile]);

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
      className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-geometric bg-muted"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 xl:mb-16">
          <h2 className="text-primary mb-6">Featured Projects</h2>

          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-lg shadow-card">
            {projectFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold hover-spring text-xs sm:text-sm md:text-base touch-feedback",
                  activeFilter === filter.value
                    ? "bg-gold text-primary shadow-md scale-105"
                    : "text-muted-foreground hover:text-primary hover:bg-sage/20 hover:scale-105 active:scale-95"
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
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-elegant hover-lift bg-noise cursor-pointer h-full"
                  onClick={() => handleViewDetails(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[3/4] sm:aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white flex flex-col">
                    <div className="h-1 w-16 bg-gold mb-3 rounded-full" />

                    <h3 className="text-lg sm:text-xl font-bold mb-3 leading-tight tracking-tight line-clamp-2">
                      {project.title}
                    </h3>

                    <div className="mt-auto grid grid-cols-[1fr,auto] gap-3 items-end border-t border-white/20 pt-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-gold">
                          <MapPin className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                        </div>
                        <p className="text-base sm:text-lg font-medium text-white/95 line-clamp-1">
                          {project.location || "Dhaka"}
                        </p>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(project);
                        }}
                        className="bg-gold hover:bg-gold/90 text-primary font-bold hover-spring hover:scale-105 shadow-lg active:scale-95 h-10 px-5"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="-left-10 sm:-left-14 lg:-left-16 border-sage text-sage hover:bg-sage hover:text-white hover-spring h-11 w-11 sm:h-12 sm:w-12 active:scale-95 touch-feedback" />
            <CarouselNext className="-right-10 sm:-right-14 lg:-right-16 border-sage text-sage hover:bg-sage hover:text-white hover-spring h-11 w-11 sm:h-12 sm:w-12 active:scale-95 touch-feedback" />
          </Carousel>
        </div>

        {/* Project count indicator */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} in {activeFilter} category
        </div>
      </div >

      {/* Project Detail Modal */}
      < ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section >
  );
};

export default FeaturedProjects;
