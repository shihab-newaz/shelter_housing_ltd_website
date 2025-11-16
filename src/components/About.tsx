import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "@/assets/about-image.jpg";
import office1 from "@/assets/office-1.jpg";
import office2 from "@/assets/office-2.jpg";
import office3 from "@/assets/office-3.jpg";
import office4 from "@/assets/office-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const officeImages = [
    { src: office1, alt: "Modern office workspace with natural lighting" },
    { src: office2, alt: "Elegant office reception area" },
    { src: office3, alt: "Contemporary collaborative workspace" },
    { src: office4, alt: "Executive meeting room with city view" },
  ];

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
    <section id="about" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Carousel */}
          <div ref={imageRef} className="relative overflow-hidden rounded-2xl shadow-elegant">
            <div className="relative">
              {officeImages.map((image, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
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
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
              <button
                onClick={handlePrevSlide}
                className="bg-white/90 hover:bg-white text-primary rounded-full p-2 transition-all shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex gap-2">
                {officeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-gold w-8" : "bg-white/70 w-2"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNextSlide}
                className="bg-white/90 hover:bg-white text-primary rounded-full p-2 transition-all shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-4 sm:space-y-6">
            <div className="h-1 w-12 sm:w-16 bg-gold" />
            <h2 className="text-primary text-2xl sm:text-3xl lg:text-4xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Building Excellence Since 2005
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Shelter Housing Limited has been at the forefront of premium real estate development for nearly two decades. 
              Our commitment to architectural excellence, sustainable practices, and customer satisfaction has made us a 
              trusted name in luxury residential and commercial projects.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              With a portfolio spanning luxury apartments, commercial towers, and exclusive villas, we bring together 
              innovative design, quality craftsmanship, and modern amenities to create spaces that inspire and endure.
            </p>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sage mb-1 sm:mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  50+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Completed Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sage mb-1 sm:mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Happy Residents</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sage mb-1 sm:mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  15+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sage mb-1 sm:mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  25+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Awards Won</div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold mt-4 sm:mt-6 lg:mt-8 w-full sm:w-auto"
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
