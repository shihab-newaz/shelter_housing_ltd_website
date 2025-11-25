import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import YouTubeEmbed from "@/utils/YouTubeEmbed";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion && heroRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Hero entrance animation
      tl.fromTo(
        overlayRef.current,
        { opacity: 0.8 },
        { opacity: 0.45, duration: 1.2 }
      )
      .fromTo(
        contentRef.current?.querySelector("h1"),
        { clipPath: "inset(100% 0% 0% 0%)", y: 50 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9 },
        "-=0.6"
      )
      .fromTo(
        contentRef.current?.querySelector("p"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        contentRef.current?.querySelector(".cta-buttons"),
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.3"
      );

      // Scroll-linked parallax effect
      gsap.to(videoRef.current, {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        videoRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          y: -6,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative w-full h-screen overflow-hidden bg-noise">
      {/* YouTube Video Background */}
      <div ref={videoRef} className="absolute inset-0 w-full h-full">
        <YouTubeEmbed
          videoId="cBPAdYMjTA8"
          title="Luxury Real Estate Showcase"
        />
      </div>

      {/* Enhanced Gradient Overlay with Atmospheric Depth */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-noise"
        style={{
          background: "linear-gradient(180deg, rgba(23, 61, 52, 0.65) 0%, rgba(23, 61, 52, 0.35) 100%)",
        }}
      />

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-6 lg:px-12 h-full flex items-center">
        <div className="max-w-4xl">
          <h1 className="text-white mb-6 font-display font-black">
            Building Futures,<br />Creating Homes
          </h1>
          <p className="text-white/90 text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed font-sans">
            Discover luxury living spaces crafted with precision, elegance, and sustainable design principles.
          </p>
          <div className="cta-buttons flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary font-semibold text-lg px-8 py-6 shadow-hover hover-spring hover:scale-110 hover:shadow-2xl"
            >
              Explore Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-sage text-white hover:bg-sage/20 font-semibold text-lg px-8 py-6 backdrop-blur-sm hover-spring hover:scale-105 hover:border-gold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
