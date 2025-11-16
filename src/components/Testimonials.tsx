import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "Shelter Housing delivered beyond our expectations. The attention to detail and quality of construction is exceptional. Our family couldn't be happier with our new home.",
      author: "Sarah Johnson",
      role: "Emerald Heights Resident",
    },
    {
      quote: "As a business owner, I needed a space that reflects our brand's values. The Skyline Corporate Tower exceeded all requirements, and the location is perfect.",
      author: "Michael Chen",
      role: "CEO, TechCorp Industries",
    },
    {
      quote: "The team at Shelter Housing was professional, transparent, and supportive throughout the entire process. The end result is a beautiful home we're proud to call ours.",
      author: "Priya Patel",
      role: "Garden Court Homeowner",
    },
  ];

  useEffect(() => {
    if (sectionRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    // Fade animation when testimonial changes
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, testimonials.length]);

  return (
    <section ref={sectionRef} className="py-24 bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-1 w-16 bg-gold mx-auto mb-6" />
          <h2 className="text-primary mb-16" style={{ fontFamily: "'Outfit', sans-serif" }}>
            What Our Clients Say
          </h2>

          <div ref={quoteRef} className="relative">
            <Quote className="w-16 h-16 text-sage/20 absolute -top-8 left-1/2 -translate-x-1/2" />
            
            <blockquote className="text-2xl md:text-3xl text-primary font-medium mb-8 leading-relaxed italic">
              "{testimonials[activeIndex].quote}"
            </blockquote>

            <div className="space-y-2">
              <div className="text-lg font-semibold text-primary">
                {testimonials[activeIndex].author}
              </div>
              <div className="text-muted-foreground">
                {testimonials[activeIndex].role}
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-gold w-10" : "bg-sage/30"
                )}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
