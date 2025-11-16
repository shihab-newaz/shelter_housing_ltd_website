import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { ProjectStatus } from "@/types/project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>("ongoing");
  const [activeIndex, setActiveIndex] = useState(0);
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

  const filters: { label: string; value: ProjectStatus }[] = [
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
    { label: "Upcoming", value: "upcoming" },
  ];

  return (
    <section id="projects" ref={containerRef} className="py-24 bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Featured Projects
          </h2>
          
          {/* Filter Tabs */}
          <div className="inline-flex items-center gap-2 p-2 bg-white rounded-lg shadow-card">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-6 py-3 rounded-md font-semibold transition-all duration-300 text-sm md:text-base",
                  activeFilter === filter.value
                    ? "bg-gold text-primary shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-sage/10"
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
            className="flex items-center justify-center gap-6 overflow-hidden min-h-[500px]"
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
                    "transition-all duration-500 ease-elegant cursor-pointer",
                    isCenter
                      ? "w-full md:w-[600px] opacity-100 scale-100 z-20"
                      : "w-0 md:w-[200px] opacity-40 scale-90 z-10",
                    !isVisible && "hidden md:block"
                  )}
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${project.title}`}
                >
                  <div className="group relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-hover transition-shadow duration-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-106"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    {isCenter && (
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="h-1 w-16 bg-gold mb-4" />
                        <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {project.title}
                        </h3>
                        <p className="text-lg mb-2 text-white/90">{project.location}</p>
                        <p className="text-white/80 mb-4">{project.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="px-3 py-1 bg-sage/20 rounded-full">{project.type}</span>
                          {project.units && (
                            <span className="px-3 py-1 bg-gold/20 rounded-full">{project.units} Units</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="border-sage text-sage hover:bg-sage hover:text-white"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-gold w-8" : "bg-sage/40"
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="border-sage text-sage hover:bg-sage hover:text-white"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
