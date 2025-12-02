import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { officeImages } from "@/constants/about";
import { COMPANY_STATS, CRAFTING_TEXT, YEARS_OF_EXPERIENCE } from "@/constants/time";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (sectionRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Content stagger animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? officeImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === officeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-geometric bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 xl:mb-16">
          <div className="h-1 w-12 sm:w-16 bg-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-primary mb-2 sm:mb-4">
            Our Head Office
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Discover our journey, expertise, and commitment to excellence in luxury real estate
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Image Carousel */}
          <div ref={imageRef} className="relative overflow-hidden rounded-2xl shadow-elegant bg-noise hover-lift">
            <div className="relative">
              {officeImages.map((image, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-700 ${
                    index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-10" />
                </div>
              ))}
            </div>
            
            {/* Carousel Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={handlePrevSlide}
                className="bg-white/90 hover:bg-white text-primary rounded-full p-2.5 sm:p-2 hover-spring hover:scale-110 active:scale-95 shadow-md touch-feedback"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-5 sm:w-5" />
              </button>
              
              <div className="flex gap-3 sm:gap-2">
                {officeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 sm:h-2 rounded-full hover-spring touch-feedback ${
                      index === currentSlide ? "bg-gold w-10 sm:w-8" : "bg-white/70 w-3 sm:w-2 hover:bg-gold/70"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNextSlide}
                className="bg-white/90 hover:bg-white text-primary rounded-full p-2.5 sm:p-2 hover-spring hover:scale-110 active:scale-95 shadow-md touch-feedback"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-4 sm:space-y-6">
            <div className="h-1 w-12 sm:w-16 bg-gold animate-fade-in" />
            <h2 className="text-primary text-2xl sm:text-3xl lg:text-4xl ">
              {CRAFTING_TEXT}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Shelter Housing Bangladesh has been a pioneer in premium real estate development within Dhaka for nearly three decades. 
              Our dedication to architectural innovation, sustainable building practices, and community-focused development has established us as a 
              leading name in luxury residential projects within the city.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              From modern apartments in Dhaka to exclusive villas in the surrounding areas, we combine traditional Bangladeshi aesthetics with 
              contemporary design, superior craftsmanship, and world-class amenities to create homes that reflect the vibrant spirit of Dhaka while 
              meeting global standards of luxury and comfort.
            </p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="hover-lift p-4 rounded-lg bg-sage/5">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-sage mb-1 sm:mb-2">
                  {COMPANY_STATS.completed_projects}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground text-mono-light">Completed Projects</div>
              </div>
              <div className="hover-lift p-4 rounded-lg bg-sage/5">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-sage mb-1 sm:mb-2">
                  {COMPANY_STATS.happy_residents}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground text-mono-light">Happy Residents</div>
              </div>
              <div className="hover-lift p-4 rounded-lg bg-sage/5">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-sage mb-1 sm:mb-2">
                  {YEARS_OF_EXPERIENCE}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground text-mono-light">Years Experience</div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold mt-4 sm:mt-6 lg:mt-8 w-full sm:w-auto hover-spring hover:scale-105 sm:hover:scale-110 hover:shadow-lg active:scale-95 touch-feedback"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
