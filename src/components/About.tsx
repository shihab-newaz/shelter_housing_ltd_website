import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "@/assets/about-image.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative overflow-hidden rounded-2xl shadow-elegant">
            <img
              src={aboutImage}
              alt="Modern architectural interior"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="h-1 w-16 bg-gold" />
            <h2 className="text-primary" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Building Excellence Since 2005
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Shelter Housing Limited has been at the forefront of premium real estate development for nearly two decades. 
              Our commitment to architectural excellence, sustainable practices, and customer satisfaction has made us a 
              trusted name in luxury residential and commercial projects.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a portfolio spanning luxury apartments, commercial towers, and exclusive villas, we bring together 
              innovative design, quality craftsmanship, and modern amenities to create spaces that inspire and endure.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <div className="text-4xl font-bold text-sage mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Completed Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-sage mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  10K+
                </div>
                <div className="text-sm text-muted-foreground">Happy Residents</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-sage mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  15+
                </div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-sage mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  25+
                </div>
                <div className="text-sm text-muted-foreground">Awards Won</div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold mt-8"
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
