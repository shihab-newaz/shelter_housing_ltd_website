import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/constants/whyChooseUs";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Cards entrance animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
          rotateY: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      );

      // Icon animation on hover
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card) => {
          const icon = card.querySelector(".feature-icon");
          
          card.addEventListener("mouseenter", () => {
            gsap.to(icon, {
              rotation: 6,
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(icon, {
              rotation: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    }
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 xl:mb-16">
          <div className="h-1 w-16 bg-gold mx-auto mb-6" />
          <h2 className="mb-4">
            Why Choose Shelter Housing
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of luxury, quality, and value with our comprehensive approach to real estate development.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 hover:bg-white/15 transition-all duration-300 border border-white/10"
            >
              <div className="feature-icon mb-4 sm:mb-6">
                <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
